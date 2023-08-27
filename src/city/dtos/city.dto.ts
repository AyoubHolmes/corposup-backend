import { IsString } from 'class-validator';

export class CreateCity {
  @IsString()
  label: string;
}
