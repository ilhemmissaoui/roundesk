import {
  IsBoolean, IsEmail, IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {Role} from "../../enums/role.enum";

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is required',
  })
  @IsString()
  username: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString()
  @IsEmail({}, {
    message: 'Email must be a valid email',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty({
    message: 'Role is required',
  })
  @IsEnum(Role)
  role: Role;
}
