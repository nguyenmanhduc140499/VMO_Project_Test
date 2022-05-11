import { ApiProperty } from '@nestjs/swagger';
import { baseCategoryDTO } from './baseCategory.dto';
export class createCategory extends baseCategoryDTO {
  @ApiProperty({ type: Date })
  createdAt: Date;
}
