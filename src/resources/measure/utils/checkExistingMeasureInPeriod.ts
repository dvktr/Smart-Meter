import { Repository } from 'typeorm';
import { Customer } from 'src/resources/customer/entities/customer.entity';
import { Measure, MeasureType } from '../entities/measure.entity';

export async function checkExistingMeasureInPeriod(
  measuresRepository: Repository<Measure>,
  customer: Customer,
  measureType: MeasureType,
  startOfPeriod: Date,
  endOfPeriod: Date,
): Promise<Measure | undefined> {
  return await measuresRepository
    .createQueryBuilder('measure')
    .where('measure.customer = :customer', { customer: customer.id })
    .andWhere('measure.type = :type', { type: measureType })
    .andWhere('(measure.createdAt BETWEEN :startOfPeriod AND :endOfPeriod)', {
      startOfPeriod,
      endOfPeriod,
    })
    .getOne();
}
