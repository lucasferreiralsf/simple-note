import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  CUSTOM_HTTP_ERRORS,
  CustomErrors,
} from '../utils/exception-filters/custom-http-errors.filter';
import { UserCreateDto } from '../users/dto/user-create.dto';
import { Auth } from './dto/login.dto';
import { IGoogleProfileJson, Provider, IToken } from './auth.config';
import { ConfigService } from '../config/config.service';
import * as moment from 'moment';
import { IUser } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  private frontendUrl: string;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
  }

  verifyJwt(jwt: string): boolean {
    const userFromJwt = this.jwtService.verify(jwt);
    if (userFromJwt.email) {
      return true;
    } else {
      return false;
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findBy({ email }, true);
    console.log(user)
    console.log(email)
    console.log(pass)
    if (user.googleId && user.password === null) {
      return {
        providerWithoutPassword: true,
        user,
      };
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      if (this.verifyEmailUser(user)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  login(user: IUser): IToken {
    const payload = {
      id: user._id,
      userEmail: user.email,
    };

    console.log(user)

    const token = this.jwtService.sign(payload);
    return {
      userId: String(user._id),
      token,
      userEmail: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async validateOAuthLogin(
    profile: IGoogleProfileJson,
    provider: Provider,
  ): Promise<IToken> {
    if (provider === Provider.GOOGLE) {
      let user = await this.userService.findBy({ email: profile.email });
      if (user) {
        if (!user.googleId) {
          user = await this.userService.updateUser(
            { email: user.email },
            {
              googleId: profile.sub,
            },
          );
        }
      } else {
        const use: any = {};
        use.email = profile.email;
        use.emailIsVerified = true;
        use.googleId = profile.sub;
        use.firstName = profile.given_name;
        use.lastName = profile.family_name;
        use.picture = profile.picture;

        user = await this.userService.storeUser(use);
      }

      const payload = {
        userId: user._id,
        userEmail: user.email,
      };

      const token: string = this.jwtService.sign(payload, {
        expiresIn: 3600,
      });

      return {
        userId: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        userEmail: user.email,
        token,
      };
    }
  }

  async register(credentials: IUser): Promise<IUser> {
    const userCreated = await this.userService.storeUser(credentials);
    if (!userCreated.emailIsVerified) {
      this.sendEmailVerification(userCreated);
    }
    return userCreated;
  }

  verifyEmailUser(user: IUser): boolean {
    if (!user.emailIsVerified) {
      this.sendEmailVerification(user);
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.EMAIL_NOT_VALIDATED },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return true;
    }
  }

  async resendEmailVerification(email: string): Promise<IUser> {
    const user = await this.userService.findBy({ email });
    if (user.email === email) {
      this.sendEmailVerification(user);
      return user;
    } else {
      throw new HttpException(
        CustomErrors.notFound(email),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async sendEmailVerification(user: IUser): Promise<void> {
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = Math.floor(100000 + Math.random() * 900000);
    user.emailToken = token.toString();
    await this.userService.updateUser(
      { email: user.email },
      { emailToken: token.toString(),
        emailTokenExpirationDate: moment(Date.now()).add(2, 'h').format(),
        // emailTokenExpirationDate: new Date(new Date().setHours(new Date().getHours() + 2)),
      },
    );
    await this.mailerService.sendMail({
      to: user.email, // sender address
      from: 'no-reply@becoder.com.br', // list of receivers
      subject: 'Account Confirmation ✔', // Subject line
      template: 'account-confirm',
      // html: `<h1>Bem vindo, seu token é: ${token}</h1>`,
      context: {
        // Data to be sent to template engine.
        link: `${this.configService.get('FRONTEND_URL')}/validate?code=${token}&email=${user.email}`,
        frontendUrl: `${this.configService.get('FRONTEND_URL')}/validate?email=${user.email}`,
        code: `${token}`,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
  }

  async validateEmailToken(token: string, email) {
      const user = await this.userService.findBy(
        { email },
        true,
      );
      if (user) {
        if (!user.emailIsVerified) {
          if (token === user.emailToken && (moment(Date.now()) <= moment(user.emailTokenExpirationDate))) {
            user.emailIsVerified = true;
            user._id = undefined;
            return await this.userService.updateUser(
              { email: user.email },
              {
                emailIsVerified: true,
              },
            );
          } else {
            this.resendEmailVerification(email);
            throw new HttpException(
              {
                error: CUSTOM_HTTP_ERRORS.TOKEN_EXPIRED.error,
                message: 'Email token expired. We sent to you a new token.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          throw new HttpException(
            {
              ...CUSTOM_HTTP_ERRORS.EMAIL_ALREADY_VALIDATED,
            },
            HttpStatus.OK,
          );
        }
      } else {
        throw new HttpException(
          CustomErrors.notFound(email),
          HttpStatus.NOT_FOUND,
        );
      }
  }
}
