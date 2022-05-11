import { Injectable } from '@nestjs/common';
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
      state: true,
    }).save();
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
    const voucher = await this.voucherModel.findById(id).exec();
    const expiry = voucher.voucherTime;
    const currenDate = new Date();
    if (expiry < currenDate) {
      await this.updateState(voucher.id, { state: false });
    }
  }

  async updateState(id: string, state: any): Promise<any> {
    const updateVoucher = await this.voucherModel
      .findOneAndUpdate({ _id: id }, state, { new: true })
      .exec();
    return updateVoucher;
  }

  async delete(id: string): Promise<Voucher> {
    return await this.voucherModel.findByIdAndDelete(id).exec();
  }
}
