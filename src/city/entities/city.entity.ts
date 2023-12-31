import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  label: string;
}
