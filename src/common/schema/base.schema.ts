import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class BaseSchema {
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  deletedAt?: Date;
}
