import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  label: string;
  @ManyToOne(() => Category, (category) => category.childs, { nullable: true })
  parent: Category;
  @OneToMany(() => Category, (category) => category.parent)
  childs: Category[];
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

  @OneToMany(() => Product, (product) => product.category, {
    nullable: true,
  })
  // @JoinColumn({ name: 'productId' })
  products: Product[];
}
