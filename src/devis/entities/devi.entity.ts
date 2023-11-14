import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface Designation {
  productID: string;
  quantity: number;
  unitPrice: number;
}

@Entity()
export class Devi {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //   @Column()
  //   Designations: List de Designation
}
