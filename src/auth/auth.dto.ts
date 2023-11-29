import { OmitType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dtos/user.dto';

export class signInDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}

export class signUpDto extends OmitType(CreateUserDto, ['contact']) {}

export class registerGoogleDto extends OmitType(CreateUserDto, [
  'contact',
  'password',
  'companyName',
  'rc',
  'ice',
  'companyLogo',
]) {}
