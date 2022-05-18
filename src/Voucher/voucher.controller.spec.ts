import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';

const voucherServiceMock = {
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
describe('voucherController', () => {
  let voucherController: VoucherController;
  let voucherService: VoucherService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule, AppModule],
      controllers: [VoucherController],
      providers: [VoucherService],
    })
      .overrideProvider(VoucherService)
      .useValue(voucherServiceMock)
      .compile();

    voucherService = moduleRef.get<VoucherService>(VoucherService);
    voucherController = moduleRef.get<VoucherController>(VoucherController);
  });

  describe('', () => {
    it('should find one voucher', async () => {
      const id = '6280a5fa1bbf1a91792d7a78';
      const voucher = {
        _id: '6280a5fa1bbf1a91792d7a78',
        value: 25,
        voucherQuantity: 14,
        voucherTime: new Date(),
        createdAt: new Date(),
      };

      voucherServiceMock.findOne.mockImplementation(() => {
        return voucher;
      });
      const data = await voucherController.findByID(id);
      const res = voucher;
      expect(data).toEqual(res);
    });
  });

  describe('create-voucher', () => {
    it('should create voucher', async () => {
      const createVoucherDto = {
        value: 50,
        voucherQuantity: 20,
        voucherTime: new Date(),
        createdAt: new Date(),
      };
      const voucher = {
        value: 50,
        voucherQuantity: 20,
        voucherTime: new Date(),
        createdAt: new Date(),
        _id: '6283e668fd5c96f56451eeda',
      };

      voucherServiceMock.create.mockImplementation(() => {
        return voucher;
      });
      const data = await voucherController.create(createVoucherDto);
      const res = voucher;
      expect(data).toEqual(res);
    });
  });

  describe('update', () => {
    it('should update voucher', async () => {
      const id = '6283e668fd5c96f56451eeda';
      const updateVoucher = {
        value: 50,
      };
      const voucher = {
        _id: '6283e668fd5c96f56451eeda',
        value: 50,
        voucherQuantity: 20,
        voucherTime: new Date(),
        completedAt: new Date(),
      };
      voucherServiceMock.update.mockImplementation(() => {
        return voucher;
      });
      const data = await voucherController.updateVoucher(id, updateVoucher);
      const res = voucher;
      expect(data).toEqual(res);
    });
  });
  describe('', () => {
    it('should delete voucher', async () => {
      const id = '6283e668fd5c96f56451eeda';
      const voucher = {
        value: 50,
        voucherQuantity: 20,
        voucherTime: new Date(),
        createdAt: new Date(),
        _id: '6283e668fd5c96f56451eeda',
      };
      voucherServiceMock.delete.mockImplementation(() => {
        return voucher;
      });
      const data = await voucherController.delete(id);
      const res = voucher;
      expect(data).toEqual(res);
    });
  });
});
