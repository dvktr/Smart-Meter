import { Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureController } from './measure.controller';
import { GenerativeAiService } from 'src/common/generative-ai/generative-ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './entities/measure.entity';
import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Measure, Customer])],
  controllers: [MeasureController],
  providers: [MeasureService, GenerativeAiService],
})
export class MeasureModule {}
