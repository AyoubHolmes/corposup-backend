import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductSpec {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  key: string;
  @Column({ nullable: false })
  value: string;
  @ManyToOne(() => Product, (product) => product.id, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
