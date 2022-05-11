import { ApiProperty } from '@nestjs/swagger';
import { BaseOrderDto } from './base.order.dto';

export class updateOrderDto extends BaseOrderDto {
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
