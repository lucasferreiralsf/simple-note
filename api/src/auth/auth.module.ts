import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
// import { ConfigModule, ConfigService } from 'nestjs-config';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { RolesGuardService } from './roles-guard/roles-guard.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secretOrPrivateKey: configService.get('SECRET_OR_PRIVATE_KEY'),
    //   signOptions: {
    //     expiresIn: 3600,
    //   },
    // }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_OR_PRIVATE_KEY'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, RolesGuardService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
