import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Whitelist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  email: string;
}
