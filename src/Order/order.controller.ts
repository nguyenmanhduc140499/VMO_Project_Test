import { UsersService } from 'src/Users/user.Service';
import { detailOrderDto } from './dto/detailOrder.dto';
import { updateOrderDto } from './dto/updateOrder.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ItemsService } from 'src/Items/Items.service';
import { OrderService } from './order.service';
import { Request } from 'express';
import { VoucherService } from 'src/Voucher/voucher.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly itemService: ItemsService,
    private readonly voucherService: VoucherService,
    private readonly userService: UsersService,
  ) {}

  @Get('action')
  async index(@Req() req: Request) {
    let options = {};
    if (req.query.s) {
      options = {
        $or: [{ ItemID: new RegExp(req.query.s.toString(), 'i') }],
      };
    }
    const dataOrder = this.orderService.request(options);
    if (req.query.sort) {
      dataOrder.sort({ quantity: req.query.sort });
    }

    const page: number = parseInt(req.query.page as any) || 1; // get page request (if no requset => get page 1)
    const limit = 5;
    const total = await this.orderService.count(options); //
    const data = await dataOrder
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
      .exec(); // vị trí bắt đầu category thứ (page -1)* số category giới hạn 1 page
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  @Get('/order:id')
  async find(@Param('id') id: string) {
    return await this.orderService.findOneOrder(id);
  }

  @Post('/createOrder')
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Body() createDetailOrder: detailOrderDto,
  ) {
    const Order = await this.orderService.createOrder(
      createOrderDto,
      createDetailOrder,
    );
    const quantityWithItemID = await this.itemService.checkQuantity(
      Order.itemOrder.ItemID,
    );

    if (Order) {
      await this.itemService.updateQuantity(Order.itemOrder.ItemID, {
        quantity: quantityWithItemID - Order.itemOrder.quantity,
      });
      await this.userService.updateVoucher(
        Order.orderDetail.UserID,
        Order.orderDetail.IdVoucher,
      );
    }
    return {
      Order: Order.itemOrder,
      DetailOrder: Order.orderDetail,
    };
  }

  @Put('/updateOrder:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: updateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }
}
