import { Customer } from 'src/resources/customer/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type MeasureType = 'WATER' | 'GAS';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @Column()
  type: MeasureType;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ default: false })
  confirmed: boolean;

  @ManyToOne(() => Customer, (customer) => customer.measures)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
