import { PartialType } from '@nestjs/swagger';
import { CreateDeviDto } from './create.dto';

export class UpdateDeviDto extends PartialType(CreateDeviDto) {}
