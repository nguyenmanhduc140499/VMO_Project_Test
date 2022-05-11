import { UsersModule } from 'src/Users/user.Module';
import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersDetail, OrderDetailSchema } from './schema/orderDetail.schema';
import { Orders, OrderSchema } from './schema/order.schema';
import { ItemModule } from 'src/Items/Items.module';

@Module({
  imports: [
    UsersModule,
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
