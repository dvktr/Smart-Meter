import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CustomerModule } from './resources/customer/customer.module';
import { MeasureModule } from './resources/measure/measure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CustomerModule,
    MeasureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
