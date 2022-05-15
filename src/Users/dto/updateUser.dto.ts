import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDTO } from './baseUsers.dto';
export class updateUserDTO {
  @ApiProperty({ type: String })
  userName?: string;

  @ApiProperty({ type: String })
  passWord?: string;

  @ApiProperty({ type: String })
  role?: string;

  @ApiProperty({ type: String })
  email?: string;

  @ApiProperty({ type: Object, description: 'voucher' })
  voucher?: {
    IdVoucher: string;
    voucherQuantity: number;
    value: number;
    // state: boolean;
  };

  @ApiProperty({ type: Date })
  completedAt: Date;
}
