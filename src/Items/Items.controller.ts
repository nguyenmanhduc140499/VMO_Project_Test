import { updateItem } from './dto/updateItem.dto';
import { createItem } from './dto/createItem.dto';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './Items.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Role } from 'src/Authorization/roles/role.enum';
import { Roles } from 'src/Authorization/roles/roles.decorator';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/Auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/Authorization/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemsService) {}

  @Get('action')
  async index(@Req() req: Request) {
    let options = {};
    if (req.query.s) {
      options = {
        $or: [
          { itemName: new RegExp(req.query.s.toString(), 'i') },
          { itemDescription: new RegExp(req.query.s.toString(), 'i') },
        ],
      };
    }
    const dataItem = this.itemService.request(options);
    if (req.query.sort) {
      dataItem.sort({ price: req.query.sort });
    }

    const page: number = parseInt(req.query.page as any) || 1; // get page request (if no requset => get page 1)
    const limit = 10;
    const total = await this.itemService.count(options); //
    const data = await dataItem
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

  @Get(':name')
  async find(@Param('name') itemName: string) {
    return await this.itemService.findOne(itemName);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async create(@Body() createItem: createItem) {
    return await this.itemService.create(createItem);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file is not image');
    } else {
      return file.filename;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateItem: updateItem) {
    return await this.itemService.update(id, updateItem);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.itemService.delete(id);
  }

  // @Get('barcode')
  // async renderBarcode(): Promise<Object> {
  //   return await this.itemService.rederBarCode();
  // }
}
