import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { AuthModule } from './../Auth/auth.Module';
import { ItemController } from './Items.controller';
import { ItemsService } from './Items.service';

const ItemServiceMock = {
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('categoryController', () => {
  let itemController: ItemController;
  let itemService: ItemsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule, AppModule, AuthModule],
      controllers: [ItemController],
      providers: [ItemsService],
    })
      .overrideProvider(ItemsService)
      .useValue(ItemServiceMock)
      .compile();

    itemService = moduleRef.get<ItemsService>(ItemsService);
    itemController = moduleRef.get<ItemController>(ItemController);
  });

  describe('', () => {
    it('should find one item', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const item = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item444',
        barCode: 'stringBuffer',
        importPrice: 10,
        price: 49,
        weight: 5,
        quantity: 1485,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        createdAt: new Date(),
      };

      ItemServiceMock.findOne.mockImplementation(() => {
        return item;
      });
      const data = await itemController.find(id);
      const res = item;
      expect(data).toEqual(res);
    });
  });

  describe('create-item', () => {
    it('should create item', async () => {
      const createItemDto = {
        itemName: 'item140499',
        importPrice: 10,
        price: 100,
        quantity: 1000,
        weight: 5,
        barCode: '123456789',
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        createdAt: new Date(),
      };

      const item = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item140499',
        barCode: 'stringBuffer',
        importPrice: 10,
        price: 100,
        weight: 5,
        quantity: 1000,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        createdAt: new Date(),
      };

      ItemServiceMock.create.mockImplementation(() => {
        return item;
      });
      const data = await itemController.create(createItemDto);
      const res = item;
      expect(data).toEqual(res);
    });
  });

  describe('update', () => {
    it('should update item', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const updateCategory = {
        itemName: 'item99',
      };

      const item = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item99',
        barCode: 'stringBuffer',
        importPrice: 10,
        price: 100,
        weight: 5,
        quantity: 1000,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        completedAt: new Date(),
      };

      ItemServiceMock.update.mockImplementation(() => {
        return item;
      });
      const data = await itemController.update(id, updateCategory);
      const res = item;
      expect(data).toEqual(res);
    });
  });

  describe('delete', () => {
    it('should delete item', async () => {
      const id = '627dc636ba3389d32a010bcd';

      const item = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item99',
        barCode: 'stringBuffer',
        importPrice: 10,
        price: 100,
        weight: 5,
        quantity: 1000,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        deletedAt: new Date(),
      };

      ItemServiceMock.delete.mockImplementation(() => {
        return item;
      });
      const data = await itemController.delete(id);
      const res = item;
      expect(data).toEqual(res);
    });
  });
});
