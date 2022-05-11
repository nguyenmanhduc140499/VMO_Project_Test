import { updateCategory } from './dto/updateCategory.dto';
import { createCategory } from './dto/createCategory.dto';
import { Category, CategoryDocument } from './schema/category.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<CategoryDocument>,
  ) {}

  request(options: any): any {
    return this.model.find(options);
  }

  async count(options: any) {
    return await this.model.count(options).lean().exec();
  }

  async findAll(): Promise<Category[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return await this.model.findById(id).exec();
  }

  async create(createCategory: createCategory): Promise<Category> {
    return await new this.model({
      ...createCategory,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateCategory: updateCategory): Promise<Category> {
    return await this.model.findByIdAndUpdate(id, updateCategory).exec();
  }

  async delete(id: string): Promise<Category> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
