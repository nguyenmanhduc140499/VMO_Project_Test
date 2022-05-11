import { Users, UsersDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
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
  // tạo ra một bản ghi mới thì cần tham số thứ 2 để nhận
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
    voucher.push(updateUserDto.voucher);
    const newData = { ...updateUserDto, voucher };
    return await this.userModel.findByIdAndUpdate(id, newData).exec();
  }

  async delete(id: string): Promise<Users> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
