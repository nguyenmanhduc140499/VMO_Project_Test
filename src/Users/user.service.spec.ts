import { async } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { VoucherModule } from './../Voucher/voucher.module';
import { VoucherService } from './../Voucher/voucher.service';
import { Voucher } from './dto/updateUser.dto';
import { Users } from './schema/user.schema';
import { UsersService } from './user.Service';

const userServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findName: jest.fn(),
  deleteVoucher: jest.fn(),
  updateVoucher: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const listUser = [
  {
    createdAt: '2022-05-16T01:59:40.109Z',
    userName: 'nguyenmanhduc14041999',
    passWord: '$2b$10$dK0PpmDW4KwF6XY1Bbi/P.ftociYQrWamBQqwayNZlzjS9byOU7nO',
    role: 'admin',
    email: 'nguyenmanhduc14499@gmail.com',
    voucher: [
      {
        IdVoucher: '6280a5fa1bbf1a91792d7a78',
        voucherQuantity: 0,
        value: 25,
      },
    ],
  },
  {
    createdAt: '2022-05-17T20:28:44.836Z',
    userName: 'nguyenmanhduc4499',
    passWord: '$2b$10$QPk0N.11snXEfyQyDpkYMuJNJujm3W/cTptzH9gXP.m8st1tC.S7G',
    role: 'admin',
    email: 'nguyenmanhduc406@gmail.com',
    voucher: [
      {
        IdVoucher: '6281b1a432d76a3ede040567',
        voucherQuantity: 1,
        value: 50,
      },
    ],
  },
];

const voucherServiceMock = {
  findOne: jest.fn(),
  updateQuantity: jest.fn(),
};
describe('userService', () => {
  let userService: UsersService;
  let voucherService: VoucherService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, VoucherModule],
      providers: [
        UsersService,
        VoucherService,
        {
          provide: getModelToken(Users.name),
          useValue: userServiceMock,
        },
        {
          provide: getModelToken(Voucher.name),
          useValue: voucherServiceMock,
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(userServiceMock)
      .overrideProvider(VoucherService)
      .useValue(voucherServiceMock)
      .compile();

    userService = moduleRef.get<UsersService>(UsersService);
    voucherService = moduleRef.get<VoucherService>(VoucherService);
  });

  describe('findall', () => {
    it('should find all user', async () => {
      const user = [
        {
          createdAt: '2022-05-16T01:59:40.109Z',
          userName: 'nguyenmanhduc14041999',
          passWord:
            '$2b$10$dK0PpmDW4KwF6XY1Bbi/P.ftociYQrWamBQqwayNZlzjS9byOU7nO',
          role: 'admin',
          email: 'nguyenmanhduc14499@gmail.com',
          voucher: [
            {
              IdVoucher: '6280a5fa1bbf1a91792d7a78',
              voucherQuantity: 0,
              value: 25,
            },
          ],
        },
        {
          createdAt: '2022-05-17T20:28:44.836Z',
          userName: 'nguyenmanhduc4499',
          passWord:
            '$2b$10$QPk0N.11snXEfyQyDpkYMuJNJujm3W/cTptzH9gXP.m8st1tC.S7G',
          role: 'admin',
          email: 'nguyenmanhduc406@gmail.com',
          voucher: [
            {
              IdVoucher: '6281b1a432d76a3ede040567',
              voucherQuantity: 1,
              value: 50,
            },
          ],
        },
      ];

      userServiceMock.findAll.mockImplementation(() => {
        return user;
      });
      const res = user;
      expect(res).toEqual(listUser);
    });
  });
});
