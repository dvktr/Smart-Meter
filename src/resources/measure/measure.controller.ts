import {
  Post,
  Patch,
  Body,
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { MeasureService } from './measure.service';
import { UploadMeasureRequestDTO } from './dto/upload-measure.dto';
import { ConfirmMeasureRequestDTO } from './dto/confirm-measure.dto';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post()
  create(@Body() createMeasureDto: UploadMeasureRequestDTO) {
    return this.measureService.create(createMeasureDto);
  }

  @Patch()
  confirm(@Body() confirmMeasureDto: ConfirmMeasureRequestDTO) {
    return this.measureService.confirm(confirmMeasureDto);
  }

  @Get(':uuid/list')
  findAll(
    @Param('uuid') uuid: string,
    @Query('measure_type') measureType: string,
    @Query('orderBy') orderBy: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC',
  ) {
    const validMeasureTypes = ['WATER', 'GAS'];
    const normalizedMeasureType = measureType?.toUpperCase();
    if (
      normalizedMeasureType &&
      !validMeasureTypes.includes(normalizedMeasureType)
    ) {
      throw new BadRequestException({
        customMessage: 'INVALID_TYPE',
        customError: 'Tipo de medição não permitida',
      });
    }
    return this.measureService.list(
      uuid,
      normalizedMeasureType,
      orderBy,
      orderDirection,
    );
  }
}
