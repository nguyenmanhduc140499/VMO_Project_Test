import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlashSaleDocument = FlashSale & Document;

@Schema()
export class FlashSale {
  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endTime: Date;

  @Prop()
  itemApplication: string[];

  @Prop()
  itemQuantityApplication: number;

  @Prop()
  salePrice: number;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);
