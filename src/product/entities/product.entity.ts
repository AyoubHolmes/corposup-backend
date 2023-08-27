import { Category } from 'src/category/entities/category.entity';
import { City } from 'src/city/entities/city.entity';
import { Deal } from 'src/deals/entities/deal.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UTILIZATION {
  OLD = 'old',
  NEW = 'new',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  quantity: number;
  @Column({ type: 'enum', enum: UTILIZATION, default: UTILIZATION.NEW })
  utilization: UTILIZATION;
  @ManyToOne(() => City, (city) => city.id, { nullable: false })
  city: City;
  @Column({ type: 'text', array: true, default: [] })
  pictures: string[];
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  registeringUser: User;
  @ManyToOne(() => Store, (store) => store.id, { nullable: false })
  store: Store;
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
  @ManyToMany(() => User, (user) => user.savedProducts)
  savingUsers: User[];

  @ManyToOne(() => Category, (category) => category.id, { nullable: true })
  category: Category;

  @OneToMany(() => Deal, (deal) => deal.product, { nullable: true })
  deals: Deal[];
}
