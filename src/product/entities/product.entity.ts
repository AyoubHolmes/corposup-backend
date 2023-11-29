import { Category } from 'src/category/entities/category.entity';
import { City } from 'src/city/entities/city.entity';
import { Deal } from 'src/deals/entities/deal.entity';
import { ProductSpec } from 'src/product-specs/entities/product-spec.entity';
import { ShippingInformation } from 'src/shipping-information/entities/shipping-information.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Unit {
  METER = 'Meter',
  LITER = 'Liter',
  POUND = 'Pound',
  PIECE = 'Piece',
  KILOGRAM = 'Kilogram',
  GRAM = 'Gram',
  SQUARE_METER = 'Square Meter',
  CUBIC_METER = 'Cubic Meter',
}

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

  @Column({ type: 'enum', enum: Unit, default: Unit.PIECE })
  unit: Unit;

  @Column({ type: 'enum', enum: UTILIZATION, default: UTILIZATION.NEW })
  utilization: UTILIZATION;

  @ManyToOne(() => City, (city) => city.id, { nullable: true })
  city: City;

  @Column({ nullable: true })
  cityName: string;

  @Column({ type: 'text', array: true, default: [] })
  pictures: string[];

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  registeringUser: User;

  @ManyToOne(() => Store, (store) => store.id, { nullable: false })
  store: Store;

  @ManyToMany(() => User, (user) => user.savedProducts)
  savingUsers: User[];

  @ManyToOne(() => Category, (category) => category.id, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Deal, (deal) => deal.product, {
    nullable: true,
    cascade: true,
  })
  deals: Deal[];

  @OneToMany(() => ProductSpec, (productSpec) => productSpec.product, {
    nullable: false,
    cascade: true,
  })
  specs: ProductSpec[];

  @ManyToOne(
    () => ShippingInformation,
    (shippingInformation) => shippingInformation.id,
    { nullable: true, cascade: true },
  )
  shippingInformation: ShippingInformation;

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
