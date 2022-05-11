import { ApiProperty } from '@nestjs/swagger';
import { baseFlashSaleDTO } from './baseFlashSale.dto';

export class CreateFlashSaleDTO extends baseFlashSaleDTO {
  @ApiProperty({ type: Date, description: 'createdAt' })
  createdAt: Date;
}
