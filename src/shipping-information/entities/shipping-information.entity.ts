import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PERIOD_METRICS {
  DAYS = 'days',
  HOURS = 'hours',
}
@Entity()
export class ShippingInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  shippingMethod: string;

  @Column({ nullable: false })
  shippingCost: number;

  @Column({ nullable: false })
  estimatedDeliveryPeriod: number;

  @Column({ type: 'enum', enum: PERIOD_METRICS, default: PERIOD_METRICS.DAYS })
  metric: PERIOD_METRICS;

  @Column({ nullable: false })
  carrier: string;

  @ManyToOne(() => Store, (store) => store.id, { nullable: false })
  store: Store;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  registeringUser: User;

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
