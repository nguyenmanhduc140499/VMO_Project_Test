import { ApiProperty } from '@nestjs/swagger';

export class baseItemDTO {
  @ApiProperty({ type: String })
  itemName?: string;

  @ApiProperty({ type: Number })
  barCode?: string;

  @ApiProperty({ type: Number })
  importPrice?: number;

  @ApiProperty({ type: Number })
  price?: number;

  @ApiProperty({ type: Number })
  quantity?: number;

  @ApiProperty({ type: Number })
  weight?: number;

  @ApiProperty({ type: String })
  avatar?: string;

  @ApiProperty({ type: String })
  detailImage?: string;

  @ApiProperty({ type: String })
  itemDescription?: string;
}
