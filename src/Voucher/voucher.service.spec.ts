import { async } from 'rxjs';
import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { Voucher } from './schema/voucher.schema';
import { VoucherService } from './voucher.service';

const voucherServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  checkQuantity: jest.fn(),
  updateQuantity: jest.fn(),
  checkDateVoucher: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const Allvoucher = [
  {
    _id: '6280a5fa1bbf1a91792d7a78',
    value: 25,
    voucherQuantity: 14,
    voucherTime: '2022-06-18T08:41:40.786Z',
    createdAt: '2022-05-18T08:41:40.786Z',
  },

  {
    _id: '6281b1a432d76a3ede040567',
    value: 50,
    voucherQuantity: 16,
    voucherTime: '2022-07-16T08:41:40.786Z',
    createdAt: '2022-05-16T08:41:40.786Z',
  },
];

const findOneVoucher = {
  _id: '6280a5fa1bbf1a91792d7a78',
  value: 25,
  voucherQuantity: 14,
  voucherTime: '2022-06-18T08:41:40.786Z',
  createdAt: '2022-05-18T08:41:40.786Z',
};

const createVoucher = {
  _id: '6281b1a432d76a3ede040567',
  value: 50,
  voucherQuantity: 20,
  voucherTime: '2022-07-16T08:41:40.786Z',
  createdAt: '2022-05-16T08:41:40.786Z',
};

const updateVoucher = {
  _id: '6280a5fa1bbf1a91792d7a78',
  value: 50,
  voucherQuantity: 14,
  voucherTime: '2022-06-18T08:41:40.786Z',
  completedAt: '2022-05-20T08:41:40.786Z',
};

const voucherNeedDelete = {
  _id: '6280a5fa1bbf1a91792d7a78',
  value: 50,
  voucherQuantity: 14,
  voucherTime: '2022-06-18T08:41:40.786Z',
  deletedAt: '2022-06-20T08:41:40.786Z',
};

const quantityOfVoucher = 14;

const dateVoucher = '2022-06-18T08:41:40.786Z';

const voucherUpdated = {
  _id: '6280a5fa1bbf1a91792d7a78',
  value: 50,
  voucherQuantity: 20,
  voucherTime: '2022-06-18T08:41:40.786Z',
  completedAt: '2022-05-20T08:41:40.786Z',
};
describe('voucherService', () => {
  let voucherService: VoucherService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        VoucherService,
        {
          provide: getModelToken(Voucher.name),
          useValue: voucherServiceMock,
        },
      ],
    })
      .overrideProvider(VoucherService)
      .useValue(voucherServiceMock)
      .compile();

    voucherService = moduleRef.get<VoucherService>(VoucherService);
  });

  describe('findAll', () => {
    it('should find all voucher', async () => {
      const voucher = [
        {
          _id: '6280a5fa1bbf1a91792d7a78',
          value: 25,
          voucherQuantity: 14,
          voucherTime: '2022-06-18T08:41:40.786Z',
          createdAt: '2022-05-18T08:41:40.786Z',
        },

        {
          _id: '6281b1a432d76a3ede040567',
          value: 50,
          voucherQuantity: 16,
          voucherTime: '2022-07-16T08:41:40.786Z',
          createdAt: '2022-05-16T08:41:40.786Z',
        },
      ];

      voucherServiceMock.findAll.mockImplementation(() => {
        return voucher;
      });
      const res = voucher;
      expect(res).toEqual(Allvoucher);
    });
  });

  describe('findOne', () => {
    it('should find one voucher', async () => {
      const oneVoucher = {
        _id: '6280a5fa1bbf1a91792d7a78',
        value: 25,
        voucherQuantity: 14,
        voucherTime: '2022-06-18T08:41:40.786Z',
        createdAt: '2022-05-18T08:41:40.786Z',
      };
      voucherServiceMock.findAll.mockImplementation(() => {
        return oneVoucher;
      });
      const res = oneVoucher;
      expect(res).toEqual(findOneVoucher);
    });
  });

  describe('create', () => {
    it('should create voucher', async () => {
      const createVoucherDto = {
        value: 50,
        voucherQuantity: 20,
      };

      const create = {
        _id: '6281b1a432d76a3ede040567',
        value: 50,
        voucherQuantity: 20,
        voucherTime: '2022-07-16T08:41:40.786Z',
        createdAt: '2022-05-16T08:41:40.786Z',
      };

      voucherServiceMock.create.mockImplementation(() => {
        return create;
      });
      const res = create;
      expect(res).toEqual(createVoucher);
    });
  });

  describe('update', () => {
    it('should update voucher', async () => {
      const id = '6280a5fa1bbf1a91792d7a78';
      const updateVoucherDto = {
        value: 50,
      };
      const voucher = {
        _id: '6280a5fa1bbf1a91792d7a78',
        value: 50,
        voucherQuantity: 14,
        voucherTime: '2022-06-18T08:41:40.786Z',
        completedAt: '2022-05-20T08:41:40.786Z',
      };

      voucherServiceMock.update.mockImplementation((id, updateVoucherDto) => {
        return voucher;
      });
      const res = voucher;
      expect(res).toEqual(updateVoucher);
    });
  });

  describe('delete', () => {
    it('should delete voucher', async () => {
      const id = '6280a5fa1bbf1a91792d7a78';
      const deleteVoucher = {
        _id: '6280a5fa1bbf1a91792d7a78',
        value: 50,
        voucherQuantity: 14,
        voucherTime: '2022-06-18T08:41:40.786Z',
        deletedAt: '2022-06-20T08:41:40.786Z',
      };

      voucherServiceMock.delete.mockImplementation((id) => {
        return deleteVoucher;
      });
      const res = deleteVoucher;
      expect(res).toEqual(voucherNeedDelete);
    });
  });

  describe('checkQuantity', () => {
    it('check quantity of voucher', async () => {
      const id = '6280a5fa1bbf1a91792d7a78';
      const quantity = 14;
      voucherServiceMock.checkQuantity.mockImplementation((id) => {
        return quantity;
      });
      const res = quantity;
      expect(res).toEqual(quantityOfVoucher);
    });
  });

  describe('checkDateVoucher', () => {
    it('should check date voucher', async () => {
      const id = '6280a5fa1bbf1a91792d7a78';
      const date = '2022-06-18T08:41:40.786Z';

      voucherServiceMock.checkDateVoucher.mockImplementation((id) => {
        return date;
      });
      const res = date;
      expect(res).toEqual(dateVoucher);
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity', async () => {
      const id = '6280a5fa1bbf1a91792d7a78';
      const quantity = 20;
      const voucherUpdate = {
        _id: '6280a5fa1bbf1a91792d7a78',
        value: 50,
        voucherQuantity: 20,
        voucherTime: '2022-06-18T08:41:40.786Z',
        completedAt: '2022-05-20T08:41:40.786Z',
      };

      voucherServiceMock.updateQuantity.mockImplementation((id) => {
        return voucherUpdate;
      });
      const res = voucherUpdate;
      expect(res).toEqual(voucherUpdated);
    });
  });
});
