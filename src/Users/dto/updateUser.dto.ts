import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDTO } from './baseUsers.dto';
export class updateUserDTO extends BaseUserDTO {
  @ApiProperty({ type: Object, description: 'voucher' })
  voucher?: { IdVoucher: string; value: number; state: boolean };

  @ApiProperty({ type: Date })
  completedAt: Date;
}
