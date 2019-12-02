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

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEmpty()
  emailToken?: string;

  @IsEmpty()
  emailTokenExpirationDate?: string;

  @IsEmpty()
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
