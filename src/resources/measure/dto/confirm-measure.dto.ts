import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ConfirmMeasureRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  measure_uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  confirmed_value: number;
}
