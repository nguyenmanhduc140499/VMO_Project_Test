import { ApiProperty } from '@nestjs/swagger';
import { baseItemDTO } from './baseItem.dto';

export class updateItem extends baseItemDTO {
  @ApiProperty({ type: Date })
  completedAt?: Date;
}
