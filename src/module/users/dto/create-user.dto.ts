import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
  })
  @Length(8, 21)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  avatar_url: string;
}
