import { ApiProperty } from '@nestjs/swagger';
import { VoucherDTO } from './voucher.dto';

export class CreateVoucherDTO extends VoucherDTO {
  @ApiProperty({ type: Date })
  createdAt: Date;
}
