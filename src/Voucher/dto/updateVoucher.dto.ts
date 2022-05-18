import { ApiProperty } from '@nestjs/swagger';
import { VoucherDTO } from './voucher.dto';
export class updateVoucherDTO {
  @ApiProperty({ type: Number })
  value?: number;

  @ApiProperty({ type: Number })
  voucherQuantity?: number;

  @ApiProperty({ type: Date })
  voucherTime?: Date;

  @ApiProperty({ type: Date })
  completedAt?: Date;
}
