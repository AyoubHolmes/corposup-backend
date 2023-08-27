import { Deal } from 'src/deals/entities/deal.entity';
import { Product } from 'src/product/entities/product.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

export enum Role {
  USER = 'user',
  VENDOR = 'vendor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  contact: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  ice: string;

  @Column({ nullable: true })
  rc: string;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;

  @OneToMany(() => Product, (product) => product.registeringUser, {
    nullable: false,
  })
  registeredProducts: Product[];

  @ManyToMany(() => Product, (product) => product.savingUsers)
  @JoinTable()
  savedProducts: Product[];

  @OneToMany(() => Deal, (deal) => deal.product, { nullable: true })
  deals: Deal[];

  @OneToMany(() => Store, (store) => store.user, { nullable: true })
  stores: Store[];
}
