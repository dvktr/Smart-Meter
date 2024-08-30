import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UploadMeasureRequestDTO } from './dto/upload-measure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measure } from './entities/measure.entity';
import { Repository } from 'typeorm';
import { GenerativeAiService } from 'src/common/generative-ai/generative-ai.service';
import { Customer } from '../customer/entities/customer.entity';
import { checkExistingMeasureInPeriod } from './utils/checkExistingMeasureInPeriod';
import { ConfirmMeasureRequestDTO } from './dto/confirm-measure.dto';

@Injectable()
export class MeasureService {
  constructor(
    @InjectRepository(Measure)
    private measuresRepository: Repository<Measure>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private generativeAiService: GenerativeAiService,
  ) {}
  async create(uploadMeasureDto: UploadMeasureRequestDTO) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { code: uploadMeasureDto.customer_code },
      });

      if (!customer) {
        throw new UnauthorizedException('Customer Code inválido');
      }

      const measureDate = new Date(uploadMeasureDto.measure_datetime);

      const startOfMonth = new Date(
        measureDate.getFullYear(),
        measureDate.getUTCMonth(),
        1,
      );
      startOfMonth.setUTCHours(0, 0, 0, 0);

      const endOfMonth = new Date(
        measureDate.getFullYear(),
        measureDate.getUTCMonth() + 1,
        0,
      );
      endOfMonth.setUTCHours(23, 59, 59, 999);

      const existingMeasure = await checkExistingMeasureInPeriod(
        this.measuresRepository,
        customer,
        uploadMeasureDto.measure_type,
        startOfMonth,
        endOfMonth,
      );

      if (existingMeasure) {
        throw new ConflictException(
          'DOUBLE_REPORT',
          'Leitura do mês já realizada',
        );
      }

      const { imageUri, result } = await this.generativeAiService.exec({
        image: uploadMeasureDto.image,
        type: uploadMeasureDto.measure_type,
      });

      const measure = this.measuresRepository.create({
        customer,
        type: uploadMeasureDto.measure_type,
        createdAt: uploadMeasureDto.measure_datetime,
        value: result,
        imageUrl: imageUri,
      });

      const savedMeasure = await this.measuresRepository.save(measure);

      return {
        image_url: savedMeasure.imageUrl,
        measure_value: savedMeasure.value,
        measure_uuid: savedMeasure.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async confirm(confirmMeasureDto: ConfirmMeasureRequestDTO) {
    const measure = await this.measuresRepository.findOne({
      where: {
        id: confirmMeasureDto.measure_uuid,
      },
    });

    if (!measure) {
      throw new NotFoundException({
        customMessage: 'MEASURE_NOT_FOUND',
        customError: 'Leitura não encontrada',
      });
    }

    if (measure.confirmed) {
      throw new ConflictException(
        'CONFIRMATION_DUPLICATE',
        'Leitura já confirmada',
      );
    }

    measure.value = confirmMeasureDto.confirmed_value;
    measure.confirmed = true;
    this.measuresRepository.save(measure);

    return {
      success: true,
    };
  }

  async list(
    uuid: string,
    measureType: string,
    orderBy: string,
    orderDirection: 'ASC' | 'DESC',
  ) {
    const customer = await this.customerRepository.findOne({
      where: { code: uuid },
    });

    if (!customer) {
      throw new NotFoundException({
        customMessage: 'CUSTOMER_NOT_FOUND',
        customError: 'Cliente não encontrado',
      });
    }

    const queryBuilder = this.measuresRepository
      .createQueryBuilder('measure')
      .andWhere('measure.customer = :id_customer', {
        id_customer: customer.id,
      });

    if (measureType) {
      queryBuilder.andWhere('measure.type LIKE :measure_type', {
        measure_type: measureType,
      });
    }

    if (orderBy && orderDirection) {
      const validOrderFields = ['value', 'confirmed'];
      if (validOrderFields.includes(orderBy)) {
        queryBuilder.orderBy(`measure.${orderBy}`, orderDirection);
      } else {
        throw new BadRequestException('Invalid order field.');
      }
    }

    const measures = await queryBuilder.getMany();
    if (measures.length == 0) {
      throw new NotFoundException();
    }

    return {
      customer_code: uuid,
      measures: measures,
    };
  }
}
