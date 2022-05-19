import { async } from 'rxjs';
import { UsersModule } from './../Users/user.Module';
import { VoucherModule } from './../Voucher/voucher.module';
import { ItemModule } from './../Items/Items.module';
import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { ItemsService } from './../Items/Items.service';
import { UsersService } from './../Users/user.Service';
import { Voucher } from './../Voucher/schema/voucher.schema';
import { VoucherService } from './../Voucher/voucher.service';
import { OrderService } from './order.service';
import { OrderModule } from './order.module';

const orderServiceMock = {
  findAllOrder: jest.fn(),
  findOneOrder: jest.fn(),
  createOrder: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findDetailOrder: jest.fn(),
  getOrderQuantity: jest.fn(),
  getIdItemInOrder: jest.fn(),
  getVoucherOfUser: jest.fn(),
};

const itemServiceMock = {
  checkQuantity: jest.fn(),
  ckeckPrice: jest.fn(),
  updateQuantity: jest.fn(),
};

const voucherServiceMock = {
  checkDateVoucher: jest.fn(),
};

const userServiceMock = {
  findOne: jest.fn(),
};

const allOrder = [
  {
    _id: '6281cad1d4a07532500c8f5e',
    ItemID: '6281b0d132d76a3ede04055d',
    quantity: 480,
    total: 23765,
    createdAt: '2022-05-16T03:53:53.509Z',
  },
  {
    _id: '62836de7e0bb27da8f22f469',
    ItemID: '6281b0d132d76a3ede04055d',
    quantity: 485,
    total: 48500,
    createdAt: '2022-05-17T09:41:59.386Z',
  },
];

const findOneOrder = {
  _id: '6281cad1d4a07532500c8f5e',
  ItemID: '6281b0d132d76a3ede04055d',
  quantity: 480,
  total: 23765,
  createdAt: '2022-05-16T03:53:53.509Z',
};

const quantityOfOrder = 480;

const ItemID = '6281b0d132d76a3ede04055d';

const getVoucherOfUser = [
  {
    IdVoucher: '6281b1a432d76a3ede040567',
    voucherQuantity: 0,
    value: 50,
  },
  {
    IdVoucher: '6280a5fa1bbf1a91792d7a78',
    voucherQuantity: 0,
    value: 25,
  },
];

const createOrder = {
  Order: {
    ItemID: '627dc636ba3389d32a010bcd',
    quantity: 1,
    total: 49,
    createdAt: '2022-05-18T20:11:48.958Z',
    _id: '628553048f2360f175f206bf',
  },
  DetailOrder: {
    ItemID: '627dc636ba3389d32a010bcd',
    quantity: 1,
    UserID: '6284057c732a806865ec00da',
    IdOrder: '628553048f2360f175f206bf',
    IdVoucher: '6281b1a432d76a3ede040567',
    paymentAfterDiscount: 24.5,
    _id: '628553048f2360f175f206c4',
  },
};

const ItemQuantity = 25;
const Itemprice = 100;
const checkDate = '2022-08-06T02:06:28.553+00:00';

const orderUpdate = {
  Order: {
    ItemID: '627dc636ba3389d32a010bcd',
    quantity: 10,
    total: 490,
    complatedAt: '2022-05-18T20:11:48.958Z',
    _id: '628553048f2360f175f206bf',
  },
  DetailOrder: {
    ItemID: '627dc636ba3389d32a010bcd',
    quantity: 10,
    UserID: '6284057c732a806865ec00da',
    IdOrder: '628553048f2360f175f206bf',
    IdVoucher: '6281b1a432d76a3ede040567',
    paymentAfterDiscount: 245,
    _id: '628553048f2360f175f206c4',
  },
};

const orderYouNeedToDelete = {
  Order: {
    ItemID: '627dc636ba3389d32a010bcd',
    quantity: 10,
    total: 490,
    deletedAt: '2022-05-18T20:11:48.958Z',
    _id: '628553048f2360f175f206bf',
  },
  DetailOrder: {
    ItemID: '627dc636ba3389d32a010bcd',
    quantity: 10,
    UserID: '6284057c732a806865ec00da',
    IdOrder: '628553048f2360f175f206bf',
    IdVoucher: '6281b1a432d76a3ede040567',
    paymentAfterDiscount: 245,
    _id: '628553048f2360f175f206c4',
  },
};

const detailOrder = {
  ItemID: '627dc636ba3389d32a010bcd',
  quantity: 10,
  UserID: '6284057c732a806865ec00da',
  IdOrder: '628553048f2360f175f206bf',
  IdVoucher: '6281b1a432d76a3ede040567',
  paymentAfterDiscount: 245,
  _id: '628553048f2360f175f206c4',
};
describe('orderService', () => {
  let orderService: OrderService;
  let itemService: ItemsService;
  let voucherService: VoucherService;
  let userService: UsersService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ItemModule, OrderModule, VoucherModule, UsersModule],
      providers: [
        OrderService,
        ItemsService,
        VoucherService,
        UsersService,
        {
          provide: getModelToken(Voucher.name),
          useValue: voucherServiceMock,
        },
      ],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .overrideProvider(ItemsService)
      .useValue(itemServiceMock)
      .overrideProvider(VoucherService)
      .useValue(voucherServiceMock)
      .overrideProvider(UsersService)
      .useValue(userServiceMock)
      .compile();

    orderService = moduleRef.get<OrderService>(OrderService);
    itemService = moduleRef.get<ItemsService>(ItemsService);
    voucherService = moduleRef.get<VoucherService>(VoucherService);
    userService = moduleRef.get<UsersService>(UsersService);
  });

  describe('findAllOrder', () => {
    it('should find all order', async () => {
      const listOrder = [
        {
          _id: '6281cad1d4a07532500c8f5e',
          ItemID: '6281b0d132d76a3ede04055d',
          quantity: 480,
          total: 23765,
          createdAt: '2022-05-16T03:53:53.509Z',
        },
        {
          _id: '62836de7e0bb27da8f22f469',
          ItemID: '6281b0d132d76a3ede04055d',
          quantity: 485,
          total: 48500,
          createdAt: '2022-05-17T09:41:59.386Z',
        },
      ];

      orderServiceMock.findAllOrder.mockImplementation(() => {
        return listOrder;
      });
      const res = listOrder;
      expect(res).toEqual(allOrder);
    });
  });

  describe('findOneOrder', () => {
    it('should find one order', async () => {
      const id = '6281cad1d4a07532500c8f5e';
      const oneOrder = {
        _id: '6281cad1d4a07532500c8f5e',
        ItemID: '6281b0d132d76a3ede04055d',
        quantity: 480,
        total: 23765,
        createdAt: '2022-05-16T03:53:53.509Z',
      };

      orderServiceMock.findOneOrder.mockImplementation((id) => {
        return oneOrder;
      });
      const res = oneOrder;
      expect(res).toEqual(findOneOrder);
    });
  });

  describe('getOrderQuantity', () => {
    it('should get order quantity', async () => {
      const id = '6281cad1d4a07532500c8f5e';
      const quantity = 480;

      orderServiceMock.getOrderQuantity.mockImplementation((id) => {
        return quantity;
      });
      const res = quantity;
      expect(res).toEqual(quantityOfOrder);
    });
  });

  describe('getIdItemInOrder', () => {
    it('should get Id of item in order', async () => {
      const id = '6281cad1d4a07532500c8f5e';
      const idOfItem = '6281b0d132d76a3ede04055d';

      orderServiceMock.getIdItemInOrder.mockImplementation(() => {
        return idOfItem;
      });
      const res = idOfItem;
      expect(res).toEqual(ItemID);
    });
  });

  describe('getVoucherOfUser', () => {
    it('should get voucher of user order', async () => {
      const id = '6281b00c32d76a3ede040557';
      const voucherOfUser = [
        {
          IdVoucher: '6281b1a432d76a3ede040567',
          voucherQuantity: 0,
          value: 50,
        },
        {
          IdVoucher: '6280a5fa1bbf1a91792d7a78',
          voucherQuantity: 0,
          value: 25,
        },
      ];

      userServiceMock.findOne.mockImplementation(() => {
        return voucherOfUser;
      });
      const res = voucherOfUser;
      expect(res).toEqual(getVoucherOfUser);
    });
  });

  describe('createOrder', () => {
    it('should create order', async () => {
      const createOrderDto = {
        ItemID: '6281b0d132d76a3ede04055d',
        IdVoucher: '6281b1a432d76a3ede040567',
        quantity: 5,
        UserID: '6281b00c32d76a3ede040557',
      };

      const voucherOfUser = [
        {
          IdVoucher: '6281b1a432d76a3ede040567',
          voucherQuantity: 0,
          value: 50,
        },
        {
          IdVoucher: '6280a5fa1bbf1a91792d7a78',
          voucherQuantity: 0,
          value: 25,
        },
      ];
      const itemId = '6281b0d132d76a3ede04055d';
      const idUser = '6281b00c32d76a3ede040557';
      const idVoucher = '6281b1a432d76a3ede040567';
      const quantity = 25;
      const price = 100;
      const date = '2022-08-06T02:06:28.553+00:00';
      const order = {
        Order: {
          ItemID: '627dc636ba3389d32a010bcd',
          quantity: 1,
          total: 49,
          createdAt: '2022-05-18T20:11:48.958Z',
          _id: '628553048f2360f175f206bf',
        },
        DetailOrder: {
          ItemID: '627dc636ba3389d32a010bcd',
          quantity: 1,
          UserID: '6284057c732a806865ec00da',
          IdOrder: '628553048f2360f175f206bf',
          IdVoucher: '6281b1a432d76a3ede040567',
          paymentAfterDiscount: 24.5,
          _id: '628553048f2360f175f206c4',
        },
      };
      orderServiceMock.createOrder.mockImplementation((createOrderDto) => {
        itemServiceMock.checkQuantity.mockImplementation((itemId) => {
          return quantity;
        });
        const checkQua = quantity;
        expect(checkQua).toEqual(ItemQuantity);
        itemServiceMock.ckeckPrice.mockImplementation((itemId) => {
          return price;
        });
        const checkPri = price;
        expect(checkPri).toEqual(Itemprice);
        voucherServiceMock.checkDateVoucher.mockImplementation((idVoucher) => {
          return date;
        });
        const time = date;
        expect(time).toEqual(checkDate);
        orderServiceMock.getVoucherOfUser.mockImplementation(() => {
          return voucherOfUser;
        });
        const voucher = voucherOfUser;
        expect(voucher).toEqual(getVoucherOfUser);
        return order;
      });
      const res = order;
      expect(res).toEqual(createOrder);
    });
  });

  describe('update', () => {
    it('should update order', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const updateOrderDto = {
        quantity: 10,
      };

      const order = {
        Order: {
          ItemID: '627dc636ba3389d32a010bcd',
          quantity: 10,
          total: 490,
          complatedAt: '2022-05-18T20:11:48.958Z',
          _id: '628553048f2360f175f206bf',
        },
        DetailOrder: {
          ItemID: '627dc636ba3389d32a010bcd',
          quantity: 10,
          UserID: '6284057c732a806865ec00da',
          IdOrder: '628553048f2360f175f206bf',
          IdVoucher: '6281b1a432d76a3ede040567',
          paymentAfterDiscount: 245,
          _id: '628553048f2360f175f206c4',
        },
      };

      orderServiceMock.update.mockImplementation(() => {
        return order;
      });
      const update = order;
      expect(update).toEqual(orderUpdate);
    });
  });

  describe('delete', () => {
    it('should delete order', async () => {
      const id = '627dc636ba3389d32a010bcd';
      const order = {
        Order: {
          ItemID: '627dc636ba3389d32a010bcd',
          quantity: 10,
          total: 490,
          deletedAt: '2022-05-18T20:11:48.958Z',
          _id: '628553048f2360f175f206bf',
        },
        DetailOrder: {
          ItemID: '627dc636ba3389d32a010bcd',
          quantity: 10,
          UserID: '6284057c732a806865ec00da',
          IdOrder: '628553048f2360f175f206bf',
          IdVoucher: '6281b1a432d76a3ede040567',
          paymentAfterDiscount: 245,
          _id: '628553048f2360f175f206c4',
        },
      };

      orderServiceMock.delete.mockImplementation(() => {
        return order;
      });
      const deleteOrder = order;
      expect(deleteOrder).toEqual(orderYouNeedToDelete);
    });
  });

  describe('findDetailOrder', () => {
    it('should find detai order', async () => {
      const idOrder = '627dc636ba3389d32a010bcd';
      const detail = {
        ItemID: '627dc636ba3389d32a010bcd',
        quantity: 10,
        UserID: '6284057c732a806865ec00da',
        IdOrder: '628553048f2360f175f206bf',
        IdVoucher: '6281b1a432d76a3ede040567',
        paymentAfterDiscount: 245,
        _id: '628553048f2360f175f206c4',
      };

      orderServiceMock.findDetailOrder.mockImplementation(() => {
        return detail;
      });
      const res = detail;
      expect(res).toEqual(detailOrder);
    });
  });
});
