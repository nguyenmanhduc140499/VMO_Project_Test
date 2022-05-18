import { ApiProperty } from '@nestjs/swagger';
import { BaseOrderDto } from './base.order.dto';

export class updateOrderDto {
  @ApiProperty({ type: String })
  ItemID?: string;

  @ApiProperty({ type: String })
  UserID?: string;

  @ApiProperty({ type: String })
  IdVoucher?: string;

  @ApiProperty({ type: Number })
  quantity?: number;

  @ApiProperty({ type: Date })
  updatedAt?: Date;
}
