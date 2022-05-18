import { ApiProperty } from '@nestjs/swagger';

export class baseCategoryDTO {
  @ApiProperty({ type: String })
  categoryName?: string;

  @ApiProperty({ type: String })
  categoryId?: string;

  @ApiProperty({ type: String })
  image?: string;

  @ApiProperty({ type: String })
  state?: string;
}
