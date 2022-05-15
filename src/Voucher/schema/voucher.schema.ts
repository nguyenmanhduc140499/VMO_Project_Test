import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoucherDocument = Voucher & Document;

@Schema()
export class Voucher {
  @Prop()
  IdVoucher?: string;

  @Prop()
  value: number;

  @Prop()
  voucherQuantity: number;

  @Prop()
  voucherTime: Date;

  // @Prop()
  // state: boolean;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}
export const VoucherSchema = SchemaFactory.createForClass(Voucher);
