import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../common/schema/base.schema';
import { Voucher, VoucherDocument } from 'src/Voucher/schema/voucher.schema';

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
  voucher?: Voucher[];

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
