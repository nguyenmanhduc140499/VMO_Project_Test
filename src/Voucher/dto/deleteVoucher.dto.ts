import { ApiProperty } from '@nestjs/swagger';
import { VoucherDTO } from './voucher.dto';
export class updateVoucherDTO extends VoucherDTO {
  @ApiProperty({ type: Date })
  deletedAt: Date;
}
