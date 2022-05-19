import { updateCategory } from './dto/updateCategory.dto';
import { createCategory } from './dto/createCategory.dto';
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from './../Authorization/roles/role.enum';
import { Roles } from './../Authorization/roles/roles.decorator';
import { Request } from 'express';
import { JwtAuthGuard } from './../Auth/guards/jwtAuth.guard';
import { RolesGuard } from './../Authorization/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('action')
  async index(@Req() req: Request) {
    let options = {};
    if (req.query.s) {
      options = {
        $or: [{ categoryName: new RegExp(req.query.s.toString(), 'i') }],
      };
    }
    const dataCategory = this.categoryService.request(options);
    if (req.query.sort) {
      dataCategory.sort({ categoryName: req.query.sort });
    }

    const page: number = parseInt(req.query.page as any) || 1; // get page request (if no requset => get page 1)
    const limit = 10;
    const total = await this.categoryService.count(options); //
    const data = await dataCategory
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
  async find(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create-category')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  //, @Req() req: Request
  async create(@Body() createcategory: createCategory) {
    return await this.categoryService.create(createcategory);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCategory: updateCategory,
  ) {
    return await this.categoryService.update(id, updateCategory);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
