import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { Provider } from '../auth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get('FRONTEND_URL')}/login/google/callback`,
      personFields: [
        'addresses',
        'birthdays',
        'phoneNumbers',
        'names',
        'photos',
      ],
      passReqToCallback: true,
      scope: [
        'profile',
        'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'email',
      ],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: Function,
  ) {
    try {
      console.log(profile);
      // console.log('REQ: ', request);

      const user: {} = await this.authService.validateOAuthLogin(
        profile._json,
        Provider.GOOGLE,
      );

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
