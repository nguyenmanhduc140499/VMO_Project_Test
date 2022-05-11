import { ApiProperty } from '@nestjs/swagger';
import { baseItemDTO } from './baseItem.dto';

export class createItem extends baseItemDTO {
  @ApiProperty({ type: Date })
  createdAt: Date;
}
