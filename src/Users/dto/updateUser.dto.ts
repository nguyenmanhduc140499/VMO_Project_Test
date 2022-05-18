import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDTO } from './baseUsers.dto';

export class Voucher {
  @ApiProperty()
  IdVoucher: string;

  @ApiProperty()
  voucherQuantity: number;

  @ApiProperty()
  value: number;
}
export class updateUserDTO {
  @ApiProperty({ type: String })
  userName?: string;

  @ApiProperty({ type: String })
  passWord?: string;

  @ApiProperty({ type: String })
  role?: string;

  @ApiProperty({ type: String })
  email?: string;

  @ApiProperty({ type: Voucher, description: 'voucher' })
  voucher?: Voucher;

  @ApiProperty({ type: Date })
  completedAt?: Date;
}
