import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemsDocument = Items & Document;

@Schema()
export class Items {
  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  barCode: number;

  @Prop({ required: true })
  importPrice: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  weight: number;

  @Prop()
  quantity: number;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  detailImage: string;

  @Prop({ required: true })
  itemDescription: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const itemSchema = SchemaFactory.createForClass(Items);
