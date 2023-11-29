import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user.',
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2)
  firstname: string;

  @ApiProperty({
    description: 'Last name of the user.',
    example: 'Joe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2)
  lastname: string;

  @ApiProperty({
    description: 'Contact of the user.',
    example: '0694795862',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('MA')
  contact: string;

  @ApiProperty({
    description: 'Email of the user.',
    example: 'john.doe.@gmail.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user.',
    example: '********',
    required: true,
  })
  @IsNotEmpty()
  @Matches(
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    {
      message:
        'Password must contain at least 8 characters.At least one number, one uppercase letter and one special character',
    },
  )
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    description: 'Role of the user.',
    example: 'vendor',
    required: true,
  })
  @IsNotEmpty()
  role: Role;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsString()
  @IsOptional()
  companyLogo: string;

  @IsOptional()
  @IsString()
  ice: string;

  @IsOptional()
  @IsString()
  rc: string;

  @IsOptional()
  @IsString()
  cityId: string;
}

export class UpdateUserProfileDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}

export class UpdateUserCredentialsDto {
  @ApiProperty({
    description: 'Current password of the user if exist.',
    example: 'Password123+++',
    required: false,
  })
  @IsOptional()
  @Matches(
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    {
      message:
        'Password must contain at least 8 characters.At least one number, one uppercase letter and one special character',
    },
  )
  currPassword: string;

  @ApiProperty({
    description: 'New password of the user.',
    example: 'Password123---',
    required: true,
  })
  @IsNotEmpty()
  @Matches(
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    {
      message:
        'Password must contain at least 8 characters.At least one number, one uppercase letter and one special character',
    },
  )
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password of the user.',
    example: 'Password123---',
    required: true,
  })
  @IsNotEmpty()
  @Matches(
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    {
      message:
        'Password must contain at least 8 characters.At least one number, one uppercase letter and one special character',
    },
  )
  confirmNewPassword: string;
}
