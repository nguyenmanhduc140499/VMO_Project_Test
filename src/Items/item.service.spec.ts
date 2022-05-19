import { async } from 'rxjs';
import { OrderService } from './../Order/order.service';
import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { OrderModule } from './../Order/order.module';
import { ItemsService } from './Items.service';
import { Items } from './schema/Item.schema';
import { Orders } from './../Order/schema/order.schema';

const itemServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  generateBarcode: jest.fn(),
  checkQuantity: jest.fn(),
  ckeckPrice: jest.fn(),
  updateQuantity: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const orderServiceMock = {
  findAllOrder: jest.fn(),
};

const findAllItem = [
  {
    _id: '627dc636ba3389d32a010bcd',
    itemName: 'item444',
    barCode: 'string buffer',
    importPrice: 10,
    price: 49,
    weight: 5,
    quantity: 1485,
    avatar: 'afjsajfoejofqasjfcjewq.img',
    detailImage: 'sadsodauodaida.img',
    itemDescription: 'item so 4',
    createdAt: '2022-05-18T08:41:40.786Z',
  },
  {
    _id: '6281b0d132d76a3ede04055d',
    itemName: 'item140499',
    barCode: 'stirng buffer',
    importPrice: 10,
    price: 100,
    weight: 5,
    quantity: 25,
    avatar: 'afjsajfoejofqasjfcjewq.img',
    detailImage: 'sadsodauodaida.img',
    itemDescription: 'item so 4',
    createdAt: '2022-05-18T08:44:40.786Z',
  },
];

const findOneItem = {
  _id: '627dc636ba3389d32a010bcd',
  itemName: 'item444',
  barCode: 'string buffer',
  importPrice: 10,
  price: 49,
  weight: 5,
  quantity: 1485,
  avatar: 'afjsajfoejofqasjfcjewq.img',
  detailImage: 'sadsodauodaida.img',
  itemDescription: 'item so 4',
  createdAt: '2022-05-18T08:41:40.786Z',
};

const createItem = {
  _id: '6281b0d132d76a3ede04055d',
  itemName: 'item140499',
  importPrice: 10,
  price: 100,
  quantity: 1000,
  weight: 5,
  barCode: '123456789',
  avatar: 'afjsajfoejofqasjfcjewq.img',
  detailImage: 'sadsodauodaida.img',
  itemDescription: 'item so 4',
  createdAt: '2022-05-18T08:41:40.786Z',
};

const updateItem = {
  _id: '627dc636ba3389d32a010bcd',
  itemName: 'item444',
  barCode: 'string buffer',
  importPrice: 10,
  price: 50,
  weight: 5,
  quantity: 100,
  avatar: 'afjsajfoejofqasjfcjewq.img',
  detailImage: 'sadsodauodaida.img',
  itemDescription: 'item so 4',
  updatedAt: '2022-05-18T08:41:40.786Z',
};

const deleteItem = {
  _id: '627dc636ba3389d32a010bcd',
  itemName: 'item444',
  barCode: 'string buffer',
  importPrice: 10,
  price: 50,
  weight: 5,
  quantity: 100,
  avatar: 'afjsajfoejofqasjfcjewq.img',
  detailImage: 'sadsodauodaida.img',
  itemDescription: 'item so 4',
  deleteAt: '2022-05-18T08:41:40.786Z',
};

const generBarcode = 'string buffer';

const quantityItem = 1485;

const priceOfItem = 49;

const ItemUpdateQuantity = {
  _id: '627dc636ba3389d32a010bcd',
  itemName: 'item444',
  barCode: 'string buffer',
  importPrice: 10,
  price: 49,
  weight: 5,
  quantity: 1000,
  avatar: 'afjsajfoejofqasjfcjewq.img',
  detailImage: 'sadsodauodaida.img',
  itemDescription: 'item so 4',
  createdAt: '2022-05-18T08:41:40.786Z',
};
describe('ItemService', () => {
  let itemService: ItemsService;
  let orderService: OrderService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, OrderModule],
      providers: [
        ItemsService,
        OrderService,
        {
          provide: getModelToken(Items.name),
          useValue: itemServiceMock,
        },
        {
          provide: getModelToken(Orders.name),
          useValue: orderServiceMock,
        },
      ],
    })
      .overrideProvider(ItemsService)
      .useValue(itemServiceMock)
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();

    itemService = moduleRef.get<ItemsService>(ItemsService);
    orderService = moduleRef.get<OrderService>(OrderService);
  });

  describe('findAll', () => {
    it('should find all item', async () => {
      const AllItem = [
        {
          _id: '627dc636ba3389d32a010bcd',
          itemName: 'item444',
          barCode: 'string buffer',
          importPrice: 10,
          price: 49,
          weight: 5,
          quantity: 1485,
          avatar: 'afjsajfoejofqasjfcjewq.img',
          detailImage: 'sadsodauodaida.img',
          itemDescription: 'item so 4',
          createdAt: '2022-05-18T08:41:40.786Z',
        },
        {
          _id: '6281b0d132d76a3ede04055d',
          itemName: 'item140499',
          barCode: 'stirng buffer',
          importPrice: 10,
          price: 100,
          weight: 5,
          quantity: 25,
          avatar: 'afjsajfoejofqasjfcjewq.img',
          detailImage: 'sadsodauodaida.img',
          itemDescription: 'item so 4',
          createdAt: '2022-05-18T08:44:40.786Z',
        },
      ];

      itemServiceMock.findAll.mockImplementation(() => {
        return AllItem;
      });
      const res = AllItem;
      expect(res).toEqual(findAllItem);
    });
  });

  describe('findOne', () => {
    it('should find one item', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const OneItem = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item444',
        barCode: 'string buffer',
        importPrice: 10,
        price: 49,
        weight: 5,
        quantity: 1485,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      itemServiceMock.findOne.mockImplementation((id) => {
        return OneItem;
      });
      const res = OneItem;
      expect(res).toEqual(findOneItem);
    });
  });

  describe('create', () => {
    it('should create item', async () => {
      const series = '123456789';
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
      };

      const create = {
        _id: '6281b0d132d76a3ede04055d',
        itemName: 'item140499',
        importPrice: 10,
        price: 100,
        quantity: 1000,
        weight: 5,
        barCode: '123456789',
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      itemServiceMock.create.mockImplementation(() => {
        return create;
      });
      const res = create;
      expect(res).toEqual(createItem);
    });
  });

  describe('update', () => {
    it('should update item', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const updateItemDto = {
        quantity: 100,
        price: 50,
      };

      const update = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item444',
        barCode: 'string buffer',
        importPrice: 10,
        price: 50,
        weight: 5,
        quantity: 100,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        updatedAt: '2022-05-18T08:41:40.786Z',
      };

      itemServiceMock.update.mockImplementation((id) => {
        return update;
      });
      const res = update;
      expect(res).toEqual(updateItem);
    });
  });

  describe('delete', () => {
    it('should delete item', async () => {
      const id = '';
      const itemDelete = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item444',
        barCode: 'string buffer',
        importPrice: 10,
        price: 50,
        weight: 5,
        quantity: 100,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        deleteAt: '2022-05-18T08:41:40.786Z',
      };

      itemServiceMock.delete.mockImplementation(() => {
        return itemDelete;
      });
      const res = itemDelete;
      expect(res).toEqual(deleteItem);
    });
  });

  describe('generateBarcode', () => {
    it('should generate barcode', async () => {
      const value = '';
      const barcode = 'string buffer';

      itemServiceMock.generateBarcode.mockImplementation(() => {
        return barcode;
      });
      const res = barcode;
      expect(res).toEqual(generBarcode);
    });
  });

  describe('checkQuantity', () => {
    it('should check quantity', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const quantity = 1485;

      itemServiceMock.checkQuantity.mockImplementation((id) => {
        return quantity;
      });

      const res = quantity;
      expect(res).toEqual(quantityItem);
    });
  });

  describe('ckeckPrice', () => {
    it('should check price of item', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const price = 49;

      itemServiceMock.ckeckPrice.mockImplementation((id) => {
        return price;
      });
      const res = price;
      expect(res).toEqual(priceOfItem);
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity for Item', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const quantity = 1000;

      const itemUpdate = {
        _id: '627dc636ba3389d32a010bcd',
        itemName: 'item444',
        barCode: 'string buffer',
        importPrice: 10,
        price: 49,
        weight: 5,
        quantity: 1000,
        avatar: 'afjsajfoejofqasjfcjewq.img',
        detailImage: 'sadsodauodaida.img',
        itemDescription: 'item so 4',
        createdAt: '2022-05-18T08:41:40.786Z',
      };

      itemServiceMock.updateQuantity.mockImplementation((id, quantity) => {
        return itemUpdate;
      });
      const res = itemUpdate;
      expect(res).toEqual(ItemUpdateQuantity);
    });
  });
});
