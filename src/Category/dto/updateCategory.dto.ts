import { ApiProperty } from '@nestjs/swagger';
import { baseCategoryDTO } from './baseCategory.dto';
export class updateCategory extends baseCategoryDTO {
  @ApiProperty({ type: Date })
  completedAt?: Date;
}
