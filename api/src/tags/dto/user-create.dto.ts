import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateIf,
  IsArray,
  IsEmail,
  IsPhoneNumber,
  IsEmpty,
  Allow,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  emailToken?: string;

  @IsEmpty()
  emailTokenExpirationDate?: string;

  @ValidateIf(o => o.googleId && o.facebookId)
  @IsNotEmpty()
  password?: string;

  @IsEmpty()
  emailIsVerified?: boolean;

  @IsEmpty()
  googleId?: string;

  @IsOptional()
  @IsArray()
  tags?: Array<{ id: string }>;

  @IsOptional()
  @IsArray()
  notes?: Array<{ id: string }>;
}
