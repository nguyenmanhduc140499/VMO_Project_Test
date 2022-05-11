import { ApiProperty } from '@nestjs/swagger';
import { baseItemDTO } from './baseItem.dto';
export class deleteItem extends baseItemDTO {
  @ApiProperty({ type: Date })
  deletedAt: Date;
}
