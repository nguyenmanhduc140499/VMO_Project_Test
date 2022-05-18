import { Items, itemSchema } from './schema/Item.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './Items.service';
import { ItemController } from './Items.controller';
import { OrderModule } from './../Order/order.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemController],
  imports: [
    MongooseModule.forFeature([{ name: Items.name, schema: itemSchema }]),
    forwardRef(() => OrderModule),
  ],
  exports: [ItemsService],
})
export class ItemModule {}
