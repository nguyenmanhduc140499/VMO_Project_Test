import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/common/schema/base.schema';
import { Voucher } from 'src/Voucher/schema/voucher.schema';

export type UsersDocument = Users & Document;

@Schema()
export class Users extends BaseSchema {
  @Prop()
  userName: string;

  @Prop()
  passWord: string;

  @Prop()
  role: string;

  @Prop()
  email: string;

  @Prop()
  //{ type: Object }
  voucher?: Voucher[];
  // {
  //   IdVoucher: string;
  //   VoucherValue: number;
  // };

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;

  auth: {
    email: { valid: boolean };
  };
}
export const UserSchema = SchemaFactory.createForClass(Users);
