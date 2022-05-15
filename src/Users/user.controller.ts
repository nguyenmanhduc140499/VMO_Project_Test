import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Put,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './user.Service';
import { Request } from 'express';
import { updateUserDTO } from './dto/updateUser.dto';
import { VoucherService } from 'src/Voucher/voucher.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly voucherService: VoucherService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @Get('action')
  async index(@Req() req: Request) {
    let options = {};
    if (req.query.s) {
      options = {
        $or: [{ userName: new RegExp(req.query.s.toString(), 'i') }],
      };
    }
    const dataUser = this.service.request(options);
    if (req.query.sort) {
      dataUser.sort({ userName: req.query.sort });
    }

    const page: number = parseInt(req.query.page as any) || 1; // get page request (if no requset => get page 1)
    const limit = 10;
    const total = await this.service.count(options); //
    const data = await dataUser
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

  @Get('/:name')
  async findByName(@Param('name') name: string) {
    return await this.service.findName(name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.service.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: updateUserDTO) {
    const idVoucher = updateUserDto.voucher.IdVoucher;
    const voucherQuantityUpdate = updateUserDto.voucher.voucherQuantity;
    const checkVoucher = await this.voucherService.findOne(idVoucher);
    const originQuantity = checkVoucher.voucherQuantity;
    if (originQuantity >= voucherQuantityUpdate) {
      return await this.service.update(id, updateUserDto);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Not enough voucher quantity',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
