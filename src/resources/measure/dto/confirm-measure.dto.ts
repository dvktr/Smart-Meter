import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ConfirmMeasureRequestDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  measure_uuid: string;

  @IsNotEmpty()
  @IsNumber()
  confirmed_value: number;
}
