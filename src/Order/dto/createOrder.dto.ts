import { ApiProperty } from '@nestjs/swagger';
import { BaseOrderDto } from './base.order.dto';

export class CreateOrderDto extends BaseOrderDto {
  @ApiProperty({ type: Date })
  createdAt: Date;
}
