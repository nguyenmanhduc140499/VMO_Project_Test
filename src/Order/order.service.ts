import { Voucher } from 'src/Voucher/schema/voucher.schema';
import { ItemsService } from 'src/Items/Items.service';
import { UsersService } from 'src/Users/user.Service';
import { updateOrderDto } from './dto/updateOrder.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDocument } from './schema/order.schema';
import {
  OrdersDetail,
  OrdersDetailDocument,
} from './schema/orderDetail.schema';
import { Model } from 'mongoose';
import { detailOrderDto } from './dto/detailOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => ItemsService))
    private itemService: ItemsService,
    private readonly userService: UsersService,
    @InjectModel(Orders.name)
    private readonly orderModel: Model<OrdersDocument>,
    @InjectModel(OrdersDetail.name)
    private readonly orderDetailModel: Model<OrdersDetailDocument>,
  ) {}

  request(options: any): any {
    return this.orderModel.find(options);
  }

  async count(options: any) {
    return await this.orderModel.count(options).lean().exec();
  }

  async findAllOrder(): Promise<Orders[]> {
    return await this.orderModel.find().exec();
  }
  async findOneOrder(id: string): Promise<Orders> {
    return await this.orderModel.findById(id).exec();
  }

  // async findDetailOrder(id: string): Promise<OrdersDetail> {
  //   return await this.orderDetailModel.findById(id).exec();
  // }

  async getOrderQuantity(id: string): Promise<number> {
    const Order = await this.orderModel.findById(id).exec();
    let OrderQuantity = Order.quantity;
    return OrderQuantity;
  }

  async getIdItemInOrder(id: string): Promise<string> {
    const Order = await this.orderModel.findById(id).exec();
    let ItemIdInOrder = Order.ItemID;
    return ItemIdInOrder;
  }

  async getVoucherOfUser(id: string): Promise<Voucher[]> {
    const user = await this.userService.findOne(id);
    return user.voucher;
  }

  async createOrder(createOrderDto: CreateOrderDto, createDetailOrder) {
    const ItemID = createOrderDto.ItemID;
    const itemQuatity = await this.itemService.checkQuantity(ItemID);
    const itemPrice = await this.itemService.ckeckPrice(ItemID);
    const itemOrder = await new this.orderModel({
      ...createOrderDto,
      total: itemPrice * createOrderDto.quantity,
      createdAt: new Date(),
    }).save();
    if (itemOrder.quantity > itemQuatity) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Not enough order quantity',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newDetails = { ...createDetailOrder, IdOrder: itemOrder._id };
    const orderDetail = await this.createDetailOrder(newDetails);

    return {
      itemOrder,
      orderDetail,
    };
  }

  async createDetailOrder(
    createDetailOrder: detailOrderDto,
  ): Promise<OrdersDetailDocument> {
    let IdOrderDetail: string;
    const UserId = createDetailOrder.UserID;
    const voucher = await this.getVoucherOfUser(UserId);
    const ItemID = createDetailOrder.ItemID;
    const itemPrice = await this.itemService.ckeckPrice(ItemID);
    if (voucher) {
      let value: number;
      let state: boolean;
      for (let valueVoucher of voucher) {
        value = valueVoucher.value;
        state = valueVoucher.state;
      }
      if (state === true && value == 50) {
        const detailOrder = await new this.orderDetailModel({
          paymentAfterDiscount: (itemPrice * createDetailOrder.quantity) / 2,
          ...createDetailOrder,
        }).save();
        IdOrderDetail = detailOrder.id;
        return detailOrder;
      }
      if (state === true && value == 25) {
        const detailOrder = await new this.orderDetailModel({
          paymentAfterDiscount:
            (itemPrice * createDetailOrder.quantity * 75) / 100,
          ...createDetailOrder,
        }).save();
        IdOrderDetail = detailOrder.id;
        return detailOrder;
      }
      if (state === true && value == 75) {
        const detailOrder = await new this.orderDetailModel({
          paymentAfterDiscount:
            (itemPrice * createDetailOrder.quantity * 25) / 100,
          ...createDetailOrder,
        }).save();
        IdOrderDetail = detailOrder.id;
        return detailOrder;
      }
      if (state === true && value == 100) {
        const detailOrder = await new this.orderDetailModel({
          paymentAfterDiscount: itemPrice * createDetailOrder.quantity * 0,
          ...createDetailOrder,
        }).save();
        IdOrderDetail = detailOrder.id;
        return detailOrder;
      }
    } else {
      const detailOrder = await new this.orderDetailModel({
        paymentAfterDiscount: itemPrice * createDetailOrder.quantity,
        ...createDetailOrder,
      }).save();
      IdOrderDetail = detailOrder.id;
      return detailOrder;
    }
  }

  async update(id: string, updateOrderDto: updateOrderDto): Promise<Orders> {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto).exec();
  }

  async delete(id: string): Promise<Orders> {
    const ItemID = await this.getIdItemInOrder(id);
    const quantityWithItemID = await this.itemService.checkQuantity(ItemID);
    const OrderQuantity = await this.getOrderQuantity(id);
    const detailOrder = await this.findDetailOrder(id);
    const idDetailOrder = detailOrder.id;
    await this.itemService.updateQuantity(ItemID, {
      quantity: quantityWithItemID + OrderQuantity,
    });

    await this.orderDetailModel.findByIdAndDelete(idDetailOrder).exec();
    return await this.orderModel.findByIdAndDelete(id).exec();
  }
  async findDetailOrder(IdOrder: string): Promise<OrdersDetailDocument> {
    return await this.orderDetailModel.findOne({ IdOrder: IdOrder }).exec();
  }
}
