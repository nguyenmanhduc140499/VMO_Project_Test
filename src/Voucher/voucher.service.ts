import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVoucherDTO } from './dto/createVoucher.dto';
import { updateVoucherDTO } from './dto/updateVoucher.dto';
import { Voucher, VoucherDocument } from './schema/voucher.schema';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {}

  request(options: any): any {
    return this.voucherModel.find(options);
  }

  async count(options: any) {
    return await this.voucherModel.count(options).lean().exec();
  }

  async findAll(): Promise<Voucher[]> {
    return await this.voucherModel.find().exec();
  }

  async findOne(id: string): Promise<VoucherDocument> {
    return await this.voucherModel.findById(id).exec();
  }

  async create(createVoucherDto: CreateVoucherDTO): Promise<Voucher> {
    const randomVoucherTime = Math.floor(Math.random() * (100 - 30) + 30);
    return await new this.voucherModel({
      ...createVoucherDto,
      voucherTime: new Date().setDate(randomVoucherTime),
      createdAt: new Date(),
      // state: true,
    }).save();
  }

  async checkQuantity(id: string): Promise<number> {
    const voucher = await this.voucherModel.findById(id).exec();
    const quantity = voucher.voucherQuantity;
    return quantity;
  }

  async update(
    id: string,
    updateVoucherDto: updateVoucherDTO,
  ): Promise<Voucher> {
    return await this.voucherModel
      .findByIdAndUpdate(id, updateVoucherDto)
      .exec();
  }

  async checkDateVoucher(id: string) {
    let expiry: Date;
    let quantity: number;
    let currenDate = new Date();
    const voucher = await this.voucherModel.findById(id).exec();
    if (voucher === null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Voucher is not available',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      expiry = voucher.voucherTime;
      quantity = voucher.voucherQuantity;
      if (
        expiry < currenDate ||
        quantity == 0 ||
        (expiry < currenDate && quantity == 0)
      ) {
        await this.delete(id);
        return voucher.voucherTime;
      }
    }
  }

  async updateQuantity(id: string, quantity: any): Promise<any> {
    const updateQuantity = await this.voucherModel
      .findOneAndUpdate({ _id: id }, quantity, { new: true })
      .exec();
    return updateQuantity;
  }

  async delete(id: string): Promise<Voucher> {
    return await this.voucherModel.findByIdAndDelete(id).exec();
  }
}
