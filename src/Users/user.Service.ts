import { Voucher } from 'src/Voucher/schema/voucher.schema';
import { VoucherService } from './../Voucher/voucher.service';
import { Users, UsersDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly voucherService: VoucherService,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  request(options: any): any {
    return this.userModel.find(options);
  }

  async count(options: any) {
    return await this.userModel.count(options).lean().exec();
  }

  async findAll(): Promise<Users[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UsersDocument> {
    return await this.userModel.findById(id).exec();
  }

  async findEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email: email }).lean().exec();
  }
  async findName(username: string): Promise<Users> {
    return await this.userModel.findOne({ userName: username }).lean().exec();
  }

  async create(createUserDto: CreateUserDTO): Promise<UsersDocument> {
    const saltOrRounds = 10;
    return await new this.userModel({
      ...createUserDto,
      passWord: await bcrypt.hash(createUserDto.passWord, saltOrRounds),
      createdAt: new Date(),
    }).save();
  }

  async createPost(createUserDto: CreateUserDTO): Promise<Users> {
    return await new this.userModel({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateUserDto: updateUserDTO): Promise<Object> {
    const user = await this.userModel.findOne({ _id: id });
    const voucher = user.voucher as any;
    const IdVoucher = updateUserDto.voucher.IdVoucher;
    const voucherQuantityOfUser = updateUserDto.voucher.voucherQuantity;
    const voucherInBase = await this.voucherService.findOne(IdVoucher);
    const OriginQuantity = voucherInBase.voucherQuantity;
    await this.voucherService.updateQuantity(IdVoucher, {
      voucherQuantity: OriginQuantity - voucherQuantityOfUser,
    });
    voucher.push(updateUserDto.voucher);
    const newData = { ...updateUserDto, voucher };
    return await this.userModel.findByIdAndUpdate(id, newData).exec();
  }

  async deleteVoucher(id: string, index: number) {
    const user = await this.userModel.findOne({ _id: id });
    const voucher = user.voucher as any;
    const newData = voucher.splice(index, 1);
    const newVoucher = { ...newData };
    return await this.userModel.findByIdAndUpdate(id, newVoucher).exec();
  }

  async updateVoucher(id: string, idVoucher: string) {
    const user = await this.userModel.findOne({ _id: id });
    const voucher = user.voucher;
    let newVoucher: Voucher;
    let index: number;
    for (let i in voucher) {
      if (voucher[i].IdVoucher == idVoucher) {
        index = voucher.indexOf(voucher[i]);
        if (voucher[i].voucherQuantity > 0) {
          voucher[i].voucherQuantity = voucher[i].voucherQuantity - 1;
          newVoucher = voucher[i];
        } else {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Not enough voucher quantity',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        break; //Stop this loop, we found it!
      }
    }
    voucher.splice(index, 1);
    voucher.push(newVoucher);
    const newData = { voucher };
    return await this.userModel.findByIdAndUpdate(id, newData).exec();
  }

  async delete(id: string): Promise<Users> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
