import { async } from 'rxjs';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { OrderService } from './../Order/order.service';
import { VoucherModule } from './../Voucher/voucher.module';
import { VoucherService } from './../Voucher/voucher.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.Service';

const userServiceMock = {
  findName: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const voucherServiceMock = {
  findOne: jest.fn(),
};

describe('userController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [VoucherModule, MongooseModule, AppModule],
      controllers: [UsersController],
      providers: [VoucherService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(userServiceMock)
      .overrideProvider(VoucherService)
      .useValue(voucherServiceMock)
      .compile();

    userService = moduleRef.get<UsersService>(UsersService);
    userController = moduleRef.get<UsersController>(UsersController);
  });

  describe('', () => {
    it('should find user', async () => {
      const name = 'nguyenmanhduc44';
      const user = {
        _id: '6280a6241bbf1a91792d7a7a',
        createdAt: new Date(),
        userName: 'nguyenmanhduc44',
        passWord:
          '$2b$10$mP1uFyC86oAlNownoAbKruXw.6plaDhEp5b/0jr62h.pMSgYE6K0W',
        role: 'admin',
        email: 'nguyenmanhduc406@gmail.com',
        voucher: [
          {
            IdVoucher: '6280a5fa1bbf1a91792d7a78',
            voucherQuantity: 0,
            value: 25,
          },
          {
            IdVoucher: '6280a5fa1bbf1a91792d7a78',
            voucherQuantity: 0,
            value: 25,
          },
        ],
      };

      userServiceMock.findName.mockImplementation(() => {
        return user;
      });
      const data = await userController.findByName(name);
      const res = user;
      expect(data).toEqual(res);
    });
  });

  describe('create-user', () => {
    it('should create user', async () => {
      const createUserDto = {
        userName: 'nguyenmanhduc44',
        passWord: '1234567',
        role: 'admin',
        email: 'nguyenmanhduc406@gmail.com',
      };

      const user = {
        createdAt: new Date(),
        userName: 'nguyenmanhduc4499',
        passWord:
          '$2b$10$QPk0N.11snXEfyQyDpkYMuJNJujm3W/cTptzH9gXP.m8st1tC.S7G',
        role: 'admin',
        email: 'nguyenmanhduc406@gmail.com',
        voucher: [],
        _id: '6284057c732a806865ec00da',
      };

      userServiceMock.create.mockImplementation(() => {
        return user;
      });
      const data = await userController.create(createUserDto);
      const res = user;
      expect(data).toEqual(res);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const id = '6284057c732a806865ec00da';
      const updateUserDto = {
        voucher: {
          IdVoucher: '6281b1a432d76a3ede040567',
          voucherQuantity: 2,
          value: 50,
        },
      };
      const user = {
        _id: '6284057c732a806865ec00da',
        createdAt: '2022-05-17T20:28:44.836Z',
        userName: 'nguyenmanhduc4499',
        passWord:
          '$2b$10$QPk0N.11snXEfyQyDpkYMuJNJujm3W/cTptzH9gXP.m8st1tC.S7G',
        role: 'admin',
        email: 'nguyenmanhduc406@gmail.com',
        voucher: [
          {
            IdVoucher: '6281b1a432d76a3ede040567',
            voucherQuantity: 2,
            value: 50,
          },
        ],
      };

      const idVoucher = '6281b1a432d76a3ede040567';
      const voucher = {
        _id: '6281b1a432d76a3ede040567',
        value: 50,
        voucherQuantity: 2,
        voucherTime: new Date(),
        createdAt: new Date(),
      };
      userServiceMock.update.mockImplementation(() => {
        return user;
      });
      voucherServiceMock.findOne.mockImplementation(() => {
        return voucher;
      });
      const data = await userController.update(id, updateUserDto);
      const res = user;
      expect(data).toEqual(res);
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const id = '6284057c732a806865ec00da';
      const user = {
        _id: '6284057c732a806865ec00da',
        createdAt: '2022-05-17T20:28:44.836Z',
        userName: 'nguyenmanhduc4499',
        passWord:
          '$2b$10$QPk0N.11snXEfyQyDpkYMuJNJujm3W/cTptzH9gXP.m8st1tC.S7G',
        role: 'admin',
        email: 'nguyenmanhduc406@gmail.com',
        voucher: [
          {
            IdVoucher: '6281b1a432d76a3ede040567',
            voucherQuantity: 2,
            value: 50,
          },
        ],
      };

      userServiceMock.delete.mockImplementation(() => {
        return user;
      });
      const data = await userController.delete(id);
      const res = user;
      expect(data).toEqual(res);
    });
  });
});
