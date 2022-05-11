import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VoucherDTO {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  value: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  voucherQuantity: number;

  @ApiProperty({ type: Date })
  voucherTime: Date;

  @ApiProperty({ type: Boolean })
  state: boolean;
}
