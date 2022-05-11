import { ItemModule } from './../Items/Items.module';
import { Module } from '@nestjs/common';
import { FlashSaleService } from './flash-sale.service';
import { FlashSaleController } from './flash-sale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSale, FlashSaleSchema } from './schema/FlashSale.Schema';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    ItemModule,
    MongooseModule.forFeature([
      { name: FlashSale.name, schema: FlashSaleSchema },
    ]),
    MailModule,
  ],
  providers: [FlashSaleService],
  controllers: [FlashSaleController],
})
export class FlashSaleModule {}
