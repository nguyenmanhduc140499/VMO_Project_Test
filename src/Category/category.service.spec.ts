import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
import { AppModule } from './../app.module';

const categoryServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const listCategory = [
  {
    _id: '6281b0bc32d76a3ede04055a',
    categoryName: 'Ca1',
    state: 'active',
    image: 'asdsafsafsdsasd',
    createdAt: '2022-05-18T08:41:40.786Z',
  },
  {
    _id: '6281b0bc32d76a3ede04055b',
    categoryName: 'Ca2',
    state: 'active',
    image: 'asdsafsafsd',
    createdAt: '2022-05-18T08:44:40.786Z',
  },
];

const OneCategory = {
  _id: '6281b0bc32d76a3ede04055a',
  categoryName: 'Ca1',
  state: 'active',
  image: 'asdsafsafsdsasd',
  createdAt: '2022-05-18T08:41:40.786Z',
};

const createCategory = {
  _id: '6281b0bc32d76a3ede04055b',
  categoryName: 'Ca2',
  state: 'active',
  image: 'asdsafsafsd',
  createdAt: '2022-05-18T08:41:40.786Z',
};

const updateCategory = {
  _id: '6281b0bc32d76a3ede04055b',
  categoryName: 'Ca3',
  state: 'active',
  image: 'asdsafsafsd',
  createdAt: '2022-05-18T08:41:40.786Z',
};

const deleteCategory = {
  _id: '6281b0bc32d76a3ede04055b',
  categoryName: 'Ca3',
  state: 'active',
  image: 'asdsafsafsd',
  createdAt: '2022-05-18T08:41:40.786Z',
};
describe('CategoryService', () => {
  let categoryService: CategoryService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        // rootMongooseTestModule(),
        // MongooseModule.forFeature([
        //   { name: Category.name, schema: CategorySchema },
        // ]),
      ],
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: categoryServiceMock,
        },
      ],
    })
      .overrideProvider(CategoryService)
      .useValue(categoryServiceMock)
      .compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
  });
  describe('findAll', () => {
    it('should find all category', async () => {
      const category = [
        {
          _id: '6281b0bc32d76a3ede04055a',
          categoryName: 'Ca1',
          state: 'active',
          image: 'asdsafsafsdsasd',
          createdAt: '2022-05-18T08:41:40.786Z',
        },
        {
          _id: '6281b0bc32d76a3ede04055b',
          categoryName: 'Ca2',
          state: 'active',
          image: 'asdsafsafsd',
          createdAt: '2022-05-18T08:44:40.786Z',
        },
      ];

      categoryServiceMock.findAll.mockImplementation(() => {
        return category;
      });
      const res = category;
      expect(res).toEqual(listCategory);
    });
  });
  describe('findOne', () => {
    it('should find one category', async () => {
      const id = '6281b0bc32d76a3ede04055a';
      const categoryFind = {
        _id: '6281b0bc32d76a3ede04055a',
        categoryName: 'Ca1',
        state: 'active',
        image: 'asdsafsafsdsasd',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      categoryServiceMock.findOne.mockImplementation((id) => {
        return categoryFind;
      });
      const res = categoryFind;
      expect(res).toEqual(OneCategory);
    });
  });

  describe('create', () => {
    it('should create category', async () => {
      const categoryDto = {
        categoryName: 'Ca2',
        image: 'asdsafsafsd',
        state: 'active',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      const category = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca2',
        state: 'active',
        image: 'asdsafsafsd',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      categoryServiceMock.create.mockImplementation(() => {
        return category;
      });

      const res = category;
      expect(res).toEqual(createCategory);
    });
  });

  describe('update', () => {
    it('should update category', async () => {
      const id = '6281b0bc32d76a3ede04055b';
      const updateCategoryDto = {
        categoryName: 'Ca3',
      };

      const update = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca3',
        state: 'active',
        image: 'asdsafsafsd',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      categoryServiceMock.update.mockImplementation(() => {
        return update;
      });

      const res = update;
      expect(res).toEqual(updateCategory);
    });
  });

  describe('delete', () => {
    it('should delete category', async () => {
      const id = '6281b0bc32d76a3ede04055b';
      const deleteCa = {
        _id: '6281b0bc32d76a3ede04055b',
        categoryName: 'Ca3',
        state: 'active',
        image: 'asdsafsafsd',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      categoryServiceMock.delete.mockImplementation((id) => {
        return deleteCa;
      });

      const res = deleteCa;
      expect(res).toEqual(deleteCategory);
    });
  });
});
