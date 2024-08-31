import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MeasureType } from '../entities/measure.entity';
import { IsValidDate } from 'src/decorators/is-valid-date.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadMeasureRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsValidDate()
  measure_datetime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['WATER', 'GAS'], {
    message: 'measureType must be one of the following values: WATER or GAS',
  })
  measure_type: MeasureType;
}
