import { IsEmail } from 'class-validator';

export class CreateWhitelistDto {
  @IsEmail()
  email: string;
}
