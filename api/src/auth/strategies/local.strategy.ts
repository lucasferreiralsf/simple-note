import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CUSTOM_HTTP_ERRORS } from '../../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.INVALID_CREDENTIALS },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (user.providerWithoutPassword) {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.SIGN_WITH_SOCIAL_WITHOUT_PASSWORD },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
