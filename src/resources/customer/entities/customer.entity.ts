import { Measure } from 'src/resources/measure/entities/measure.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => Measure, (measure) => measure.customer)
  measures: Measure[];
}
