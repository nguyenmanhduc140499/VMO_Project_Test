import { ItemsService } from './../Items/Items.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Model } from 'mongoose';
import { CreateFlashSaleDTO } from './dto/createFlaseSale.dto';
import { FlashSale, FlashSaleDocument } from './schema/FlashSale.Schema';
import EmailScheduleDto from './dto/emailSchedule.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class FlashSaleService {
  constructor(
    @InjectModel(FlashSale.name)
    private readonly FSmodel: Model<FlashSaleDocument>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly itemService: ItemsService,
    private readonly emailService: MailService,
  ) {}

  async create(
    createFlashSaleDto: CreateFlashSaleDTO,
  ): Promise<FlashSaleDocument> {
    const ItemFS = createFlashSaleDto.itemApplication;
    const Item = await this.itemService.findOne(ItemFS.IdItem);
    const now = new Date();
    const endTime = new Date(now.setDate(now.getDate() + 1)).toUTCString();

    if (Item) {
      if (Item.quantity > ItemFS.quantityApplication) {
        const FS = await new this.FSmodel({
          ...createFlashSaleDto,
          startDate: new Date(),
          endTime: endTime,
          createdAt: new Date(),
        }).save();
        return FS;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Not enough item quantity',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'item does not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateItemWhenFSOn(createFlashSaleDto: CreateFlashSaleDTO) {
    const IdItem = createFlashSaleDto.itemApplication.IdItem;
    const PriceSale = createFlashSaleDto.itemApplication.salePrice;
    const QuantitySale = createFlashSaleDto.itemApplication.quantityApplication;
    const newData = {
      price: PriceSale,
      quantity: QuantitySale,
    };
    return await this.itemService.update(IdItem, newData);
  }

  async deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
    console.log('interval is done');
  }

  cancelJob(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    job.stop();
  }

  async addCronJobCreateFS(
    nameJob: string,
    createFlashSaleDto: CreateFlashSaleDTO,
    emailSchedule: EmailScheduleDto,
  ) {
    const date = new Date();
    const timeMail = new Date(date.getTime() + 1 * 1000);
    const startDate = new Date(date.getTime() + 1 * 6000);
    let IdFlashSale: string;
    let quantityWhenFsOn: number;
    const IdItem = createFlashSaleDto.itemApplication.IdItem;
    const Item = await this.itemService.findOne(IdItem);
    const cost = Item.price;
    const originalQuantity = Item.quantity;
    let FlashSale: FlashSaleDocument;

    const recipient = emailSchedule.recipient;
    const mailJob = new CronJob(timeMail, async () => {
      await this.emailService.sendMailFlashSale(recipient);
      return mailJob;
    });

    const job = new CronJob(startDate, async () => {
      const flashSale = await this.create(createFlashSaleDto);
      IdFlashSale = flashSale.id.toString();
      quantityWhenFsOn = createFlashSaleDto.itemApplication.quantityApplication;

      await this.updateItemWhenFSOn(createFlashSaleDto);
      FlashSale = flashSale;
      return FlashSale;
    });

    const startCheck = new Date(startDate.getTime() + 1 * 5000);
    const jobCheckTimeOut = new CronJob(startCheck, async () => {
      const callback = async (): Promise<boolean> => {
        const FS = await this.FSmodel.findById(IdFlashSale);
        const lastDate = FS.endTime;
        const Item = await this.itemService.findOne(IdItem);
        const quantity = Item.quantity;

        const currentDate = new Date();
        if (lastDate < currentDate || quantity == 0) {
          console.log(
            'Flash sale time has expired or the quantity is out of stock',
          );
          this.cancelJob(nameJob);
          const itemWhenStopFS = await this.itemService.findOne(IdItem);
          const quantityWhenStopFS = itemWhenStopFS.quantity;
          this.deleteInterval(nameJob);
          const ItemBeforeFlashSale = {
            price: cost,
            quantity: originalQuantity + quantityWhenStopFS - quantityWhenFsOn,
          };

          await this.itemService.update(IdItem, ItemBeforeFlashSale);
          return true;
        } else {
          console.log('flash sale is still available');
          return false;
        }
      };
      const interval = setInterval(callback, 5000);
      this.schedulerRegistry.addInterval(nameJob, interval);
    });
    this.schedulerRegistry.addCronJob(nameJob, job);
    this.schedulerRegistry.addCronJob(`${Date.now()}`, mailJob);
    this.schedulerRegistry.addCronJob(`name`, jobCheckTimeOut);
    mailJob.start();
    job.start();
    jobCheckTimeOut.start();
  }
}
