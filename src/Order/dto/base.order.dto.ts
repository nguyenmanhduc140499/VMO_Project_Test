import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseOrderDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  ItemID: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  UserID: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  quantity: number;
}
