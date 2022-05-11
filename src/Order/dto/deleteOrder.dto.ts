import { ApiProperty } from '@nestjs/swagger';
import { BaseOrderDto } from './base.order.dto';

export class deleteOrderDto extends BaseOrderDto {
  @ApiProperty({ type: Date })
  deletedAt: Date;
}
