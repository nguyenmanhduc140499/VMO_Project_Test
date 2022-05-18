import { UsersService } from './../Users/user.Service';
import { async } from 'rxjs';
import { SchedulerRegistry, ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './../app.module';
import { ItemModule } from './../Items/Items.module';
import { ItemsService } from './../Items/Items.service';
import { MailModule } from './../mail/mail.module';
import { MailService } from './../mail/mail.service';
import { FlashSaleController } from './flash-sale.controller';
import { FlashSaleService } from './flash-sale.service';
import { OrderModule } from './../Order/order.module';
import { OrderService } from './../Order/order.service';
import { VoucherModule } from './../Voucher/voucher.module';
import { UsersModule } from './../Users/user.Module';
import { VoucherService } from './../Voucher/voucher.service';

const flashSaleServiceMock = {
  addCronJobCreateFS: jest.fn(),
  create: jest.fn(),
  updateItemWhenFSOn: jest.fn(),
  deleteInterval: jest.fn(),
  cancelJob: jest.fn(),
};

const itemServiceMock = {
  findOne: jest.fn(),
  update: jest.fn(),
};

const mailServiceMock = {
  sendMailFlashSale: jest.fn(),
};

const schedulerRegistryServiceMock = {
  addInterval: jest.fn(),
  addCronJob: jest.fn(),
  getCronJob: jest.fn(),
  deleteInterval: jest.fn(),
};

describe('FlashSaleController', () => {
  let flashSaleController: FlashSaleController;
  let flashSaleService: FlashSaleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FlashSaleController],
      providers: [FlashSaleService],
    })
      .overrideProvider(FlashSaleService)
      .useValue(flashSaleServiceMock)
      .overrideProvider(ItemsService)
      .useValue(itemServiceMock)
      .overrideProvider(MailService)
      .useValue(mailServiceMock)
      .overrideProvider(SchedulerRegistry)
      .useValue(schedulerRegistryServiceMock)
      .compile();

    flashSaleService = moduleRef.get<FlashSaleService>(FlashSaleService);
    flashSaleController =
      moduleRef.get<FlashSaleController>(FlashSaleController);
  });

  describe('', () => {
    it('should create flash sale', async () => {
      const createFlashSaleDto = {
        description: 'job FS 1',
        startDate: new Date(),
        endTime: new Date(),
        itemApplication: {
          IdItem: '6281b0d132d76a3ede04055d',
          quantityApplication: 485,
          salePrice: 49,
        },
      };
      const emailSchedule = {
        recipient: 'nguyenmanhduc14499@gmail.com',
        content: 'FS so 1 bat dau',
      };
      const nameJob = 'oidoioi job';

      const flashSale = {
        _id: '6280da168d98adce56f99c8a',
        description: 'job FS 1',
        startDate: new Date(),
        endTime: new Date(),

        itemApplication: [
          {
            IdItem: '627dc636ba3389d32a010bcd',
            quantityApplication: 1500,
            salePrice: 49,
          },
        ],
        createdAt: new Date(),
      };
      // const item = {
      //   _id: '627dc636ba3389d32a010bcd',
      //   itemName: 'item444',
      //   barCode: 'stringBuffer',
      //   importPrice: 10,
      //   price: 49,
      //   weight: 5,
      //   quantity: 1485,
      //   avatar: 'afjsajfoejofqasjfcjewq.img',
      //   detailImage: 'sadsodauodaida.img',
      //   itemDescription: 'item so 4',
      //   createdAt: new Date(),
      // };

      // const mail = {
      //   accepted: ['nguyenmanhduc14499@gmail.com'],
      //   rejected: [],
      //   envelopeTime: 948,
      //   messageTime: 856,
      //   messageSize: 326,
      //   response:
      //     '250 2.0.0 OK  1652850539 p23-20020a1709027ed700b0015e8da1fb07sm545461plb.127 - gsmtp',
      //   envelope: {
      //     from: 'nguyenmanhduc406@gmail.com',
      //     to: ['nguyenmanhduc14499@gmail.com'],
      //   },
      //   messageId: '<aba0e565-0942-dbd8-1fbf-685d1e9f9830@gmail.com>',
      // };
      // const IdItem = '627dc636ba3389d32a010bcd';

      // itemServiceMock.findOne.mockImplementation(() => {
      //   return item;
      // });

      // mailServiceMock.sendMailFlashSale.mockImplementation(() => {
      //   return mail;
      // });

      // flashSaleServiceMock.create.mockImplementation(() => {
      //   return flashSale;
      // });

      // flashSaleServiceMock.updateItemWhenFSOn.mockImplementation(() => {
      //   itemServiceMock.update.mockImplementation(() => {
      //     return item;
      //   });
      // });

      // flashSaleServiceMock.cancelJob.mockImplementation(() => {
      //   schedulerRegistryServiceMock.getCronJob.mockImplementation(
      //     () => true,
      //   );
      // });

      // flashSaleServiceMock.deleteInterval.mockImplementation(() => {
      //   schedulerRegistryServiceMock.deleteInterval.mockImplementation(
      //     () => true,
      //   );
      // });

      // schedulerRegistryServiceMock.addInterval.mockImplementation(() => true);
      // schedulerRegistryServiceMock.addCronJob.mockImplementation(() => true);

      flashSaleServiceMock.addCronJobCreateFS.mockImplementation(() => {
        return flashSale;
      });

      const data = await flashSaleController.createFS(
        createFlashSaleDto,
        emailSchedule,
        nameJob,
      );
      const res = flashSale;
      expect(data).toEqual(res);
    });
  });
});
