import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DealStatus {
  PENDING = 'pending',
  CLOSED = 'closed',
  REJECTED = 'rejected',
}

@Entity()
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @ManyToOne(() => Product, (product) => product.id, { nullable: false })
  product: Product;
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
  @Column({ type: 'enum', enum: DealStatus, default: DealStatus.PENDING })
  status: DealStatus;
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
}
