import { updateItem } from './dto/updateItem.dto';
import { OrderService } from './../Order/order.service';
import { createItem } from './dto/createItem.dto';
import {
  forwardRef,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Items, ItemsDocument } from './schema/Item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    @InjectModel(Items.name) private readonly ItemModel: Model<ItemsDocument>,
  ) {}

  request(options: any): any {
    return this.ItemModel.find(options);
  }

  async count(options: any) {
    return await this.ItemModel.count(options).lean().exec();
  }

  async findAll(): Promise<Items[]> {
    return await this.ItemModel.find().exec();
  }

  async findOne(id: string): Promise<Items> {
    return await this.ItemModel.findById(id).exec();
  }

  async create(createItem: createItem): Promise<Items> {
    const randomBarcode = Math.floor(
      100000000000 + Math.random() * 900000000000,
    ).toString();
    return await new this.ItemModel({
      ...createItem,
      barCode: randomBarcode,
      createdAt: new Date(),
    }).save();
  }

  async checkQuantity(id: string): Promise<number> {
    const item = await this.ItemModel.findById(id).exec();
    const quantity = item.quantity;
    return quantity;
  }

  async ckeckPrice(id: string): Promise<number> {
    const item = await this.ItemModel.findById(id).exec();
    const price = item.price;
    return price;
  }

  async updateQuantity(id: string, quantity: any): Promise<any> {
    const updateItem = await this.ItemModel.findOneAndUpdate(
      { _id: id },
      quantity,
      { new: true },
    ).exec();
    return updateItem;
  }

  async update(id: string, updateItem: updateItem): Promise<Items> {
    return await this.ItemModel.findByIdAndUpdate(id, updateItem).exec();
  }

  async delete(id: string): Promise<Items> {
    const ItemID = id;
    let listOrder = await this.orderService.findAllOrder();
    for (let order of listOrder) {
      let ItemInOrder = order;
      let IdItem = ItemInOrder.ItemID;
      if (id === IdItem) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'item is being ordered ',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return await this.ItemModel.findByIdAndDelete(id).exec();
      }
    }
  }
}
