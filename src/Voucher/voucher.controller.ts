import { updateUserDTO } from 'src/Users/dto/updateUser.dto';
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
import { VoucherService } from './voucher.service';
import { Request } from 'express';
import { CreateVoucherDTO } from './dto/createVoucher.dto';
import { updateVoucherDTO } from './dto/updateVoucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get('action')
  async index(@Req() req: Request) {
    let options = {};
    if (req.query.s) {
      options = {
        $or: [{ value: new RegExp(req.query.s.toString(), 'i') }],
      };
    }
    const dataVoucher = this.voucherService.request(options);
    if (req.query.sort) {
      dataVoucher.sort({ value: req.query.sort });
    }

    const page: number = parseInt(req.query.page as any) || 1; // get page request (if no requset => get page 1)
    const limit = 5;
    const total = await this.voucherService.count(options); //
    const data = await dataVoucher
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

  @Get(':id')
  async findByID(@Param('id') id: string) {
    const voucher = await this.voucherService.findOne(id);
    return voucher;
  }

  @Post('/create-voucher')
  async create(@Body() createVoucherDto: CreateVoucherDTO) {
    return await this.voucherService.create(createVoucherDto);
  }

  @Put('/update/:id')
  async updateVoucher(
    @Param('id') id: string,
    @Body() updateVoucher: updateVoucherDTO,
  ) {
    const voucher = await this.voucherService.update(id, updateVoucher);
    return voucher;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.voucherService.delete(id);
  }
}
