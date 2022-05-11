import { ApiProperty } from '@nestjs/swagger';

export class baseFlashSaleDTO {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  startDate: Date;

  @ApiProperty({ type: Date })
  endTime: Date;

  @ApiProperty({ type: Object })
  itemApplication: {
    IdItem: string;
    quantityApplication: number;
    salePrice: number;
  };
}
