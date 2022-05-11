import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrdersDocument = Orders & Document;
@Schema()
export class Orders {
  @Prop()
  ItemID: string;

  @Prop()
  quantity: number;

  @Prop()
  total: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Orders);
