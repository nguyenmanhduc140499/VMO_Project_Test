import { async } from 'rxjs';
import { UsersService } from './../Users/user.Service';

import { ItemsService } from './../Items/Items.service';
import { VoucherModule } from './../Voucher/voucher.module';
import { AppModule } from './../app.module';
import { OrderModule } from './order.module';
import { ItemModule } from './../Items/Items.module';
import { UsersModule } from './../Users/user.Module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

const OrderServiceMock = {
  createOrder: jest.fn(),
  findOneOrder: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const ItemsServiceMock = {
  checkQuantity: jest.fn(),
  updateQuantity: jest.fn(),
};

const UserServiceMock = {
  updateVoucher: jest.fn(),
};

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ItemModule,
        VoucherModule,
        MongooseModule,
        AppModule,
      ],
      controllers: [OrderController],
      providers: [OrderService, ItemsService, UsersService],
    })
      .overrideProvider(OrderService)
      .useValue(OrderServiceMock)
      .overrideProvider(ItemsService)
      .useValue(ItemsServiceMock)
      .overrideProvider(UsersService)
      .useValue(UserServiceMock)
      .compile();

    orderService = moduleRef.get<OrderService>(OrderService);
    orderController = moduleRef.get<OrderController>(OrderController);
  });

  describe('/createOrder', () => {
    it('should create an order', async () => {
      const createOrderDto = {
        createdAt: new Date(),
        ItemID: '6281b0d132d76a3ede04055d',
        UserID: '6281b00c32d76a3ede040557',
        IdVoucher: '6281b1a432d76a3ede040567',
        quantity: 485,
      };
      const createDetailOrder = {
        ItemID: '6281b0d132d76a3ede04055d',
        UserID: '6281b00c32d76a3ede040557',
        IdVoucher: '6281b1a432d76a3ede040567',
        quantity: 485,
      };

      const order = {
        itemOrder: {
          ItemID: '6281b0d132d76a3ede04055d',
          quantity: 485,
          total: 23765,
          createdAt: new Date(),
        },
        orderDetail: {
          ItemID: '6281b0d132d76a3ede04055d',
          quantity: 485,
          UserID: '6281b00c32d76a3ede040557',
          IdOrder: '6281cad1d4a07532500c8f5e',
          IdVoucher: '6281b1a432d76a3ede040567',
          paymentAfterDiscount: 11882.5,
        },
      };

      const quantityWithItemID = 1000;

      OrderServiceMock.createOrder.mockImplementation(async () => {
        return order;
      });

      ItemsServiceMock.checkQuantity.mockImplementation(async () => {
        return quantityWithItemID;
      });

      ItemsServiceMock.updateQuantity.mockImplementation(() => true);
      UserServiceMock.updateVoucher.mockResolvedValue(true);

      const data = await orderController.create(
        createOrderDto,
        createDetailOrder,
      );

      const res = {
        Order: order.itemOrder,
        DetailOrder: order.orderDetail,
      };

      expect(data).toEqual(res);
    });
  });

  describe('', () => {
    it('should find an order', async () => {
      const id = '6281cad1d4a07532500c8f5e';
      const order = {
        _id: '6281cad1d4a07532500c8f5e',
        ItemID: '6281b0d132d76a3ede04055d',
        quantity: 485,
        total: 23765,
        createdAt: '2022-05-16T03:53:53.509Z',
      };

      OrderServiceMock.findOneOrder.mockImplementation(() => {
        return order;
      });
      const data = await orderController.find(id);
      const res = order;
      expect(data).toEqual(res);
    });
  });
  describe('', () => {
    it('should update an order', async () => {
      const id = '6281cad1d4a07532500c8f5e';
      const updateOrderDto = {
        quantity: 480,
      };

      const order = {
        _id: '6281cad1d4a07532500c8f5e',
        ItemID: '6281b0d132d76a3ede04055d',
        quantity: 480,
        total: 23765,
        updatedAt: new Date(),
      };

      OrderServiceMock.update.mockImplementation(() => {
        return order;
      });
      const data = await orderController.update(id, updateOrderDto);
      const res = order;
      expect(data).toEqual(res);
    });
  });
  describe('', () => {
    it('should delete an order', async () => {
      const id = '6281cad1d4a07532500c8f5e';
      const order = {
        _id: '6281cad1d4a07532500c8f5e',
        ItemID: '6281b0d132d76a3ede04055d',
        quantity: 485,
        total: 23765,
        createdAt: new Date(),
      };

      OrderServiceMock.delete.mockImplementation(() => {
        return order;
      });
      const data = await orderController.delete(id);
      const res = order;
      expect(data).toEqual(res);
    });
  });
  describe('action',() =>{
      
  })
});
