import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Orders } from './order.schema';

export type OrdersDetailDocument = OrdersDetail & Document;
@Schema()
export class OrdersDetail extends Orders {
  @Prop()
  UserID: string;

  @Prop()
  IdOrder: string;

  @Prop()
  paymentAfterDiscount: number;
}
export const OrderDetailSchema = SchemaFactory.createForClass(OrdersDetail);
