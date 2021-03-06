import { UsersModule } from './../Users/user.Module';
import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersDetail, OrderDetailSchema } from './schema/orderDetail.schema';
import { Orders, OrderSchema } from './schema/order.schema';
import { ItemModule } from './../Items/Items.module';
import { VoucherModule } from './../Voucher/voucher.module';

@Module({
  imports: [
    UsersModule,
    VoucherModule,
    MongooseModule.forFeature([
      { name: OrdersDetail.name, schema: OrderDetailSchema },
      { name: Orders.name, schema: OrderSchema },
    ]),
    forwardRef(() => ItemModule),
    // ItemModule,
  ],
  exports: [OrderService],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
