import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MeasureType } from '../entities/measure.entity';
import { IsValidDate } from 'src/decorators/is-valid-date.decorator';

export class UploadMeasureRequestDTO {
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  image: string;

  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @IsNotEmpty()
  @IsDateString()
  @IsValidDate()
  measure_datetime: Date;

  @IsNotEmpty()
  @IsEnum(['WATER', 'GAS'], {
    message: 'measureType must be one of the following values: WATER or GAS',
  })
  measure_type: MeasureType;
}
