import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthModule } from './../Auth/auth.Module';

const categoryServiceMock = {
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('categoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule, AppModule, AuthModule],
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(categoryServiceMock)
      .compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  describe('', () => {
    it('should find one category', async () => {
      const id = '6281b0bc32d76a3ede04055b';
      const category = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca2',
        state: 'active',
        image: 'asdsafsafsd',
        createdAt: new Date(),
      };

      categoryServiceMock.findOne.mockImplementation(() => {
        return category;
      });
      const data = await categoryController.find(id);
      const res = category;
      expect(data).toEqual(res);
    });
  });

  describe('create-category', () => {
    it('should create category', async () => {
      const categoryDto = {
        categoryName: 'Ca2',
        image: 'asdsafsafsd',
        state: 'active',
        createdAt: new Date(),
      };

      const category = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca2',
        state: 'active',
        image: 'asdsafsafsd',
        createdAt: new Date(),
      };

      categoryServiceMock.create.mockImplementation(() => {
        return category;
      });
      const data = await categoryController.create(categoryDto);
      const res = category;
      expect(data).toEqual(res);
    });
  });

  describe('update', () => {
    it('should update category', async () => {
      const id = '6281b0bc32d76a3ede04055b';
      const updateCategory = {
        categoryName: 'Ca2',
      };
      const category = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca2',
        state: 'active',
        image: 'asdsafsafsd',
        completedAt: new Date(),
      };

      categoryServiceMock.update.mockImplementation(() => {
        return category;
      });
      const data = await categoryController.update(id, updateCategory);
      const res = category;
      expect(data).toEqual(res);
    });
  });

  describe('', () => {
    it('should delete category', async () => {
      const id = '6281b0bc32d76a3ede04055b';
      const category = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca2',
        state: 'active',
        image: 'asdsafsafsd',
        deletedAt: new Date(),
      };

      categoryServiceMock.delete.mockImplementation(() => {
        return category;
      });
      const data = await categoryController.delete(id);
      const res = category;
      expect(data).toEqual(res);
    });
  });
});
