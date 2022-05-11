import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.Module';
import { UsersModule } from './Users/user.Module';
import { CategoryModule } from './Category/category.module';
import { ItemModule } from './Items/Items.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Authorization/roles/roles.guard';
import { OrderModule } from './Order/order.module';
import { VoucherModule } from './Voucher/voucher.module';
import { FlashSaleModule } from './flash-sale/flash-sale.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Config } from './config/config.module';
import { JwtAuthGuard } from './Auth/guards/jwtAuth.guard';

@Module({
  imports: [
    Config,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/Project-test'),
    UsersModule,
    AuthModule,
    CategoryModule,
    ItemModule,
    OrderModule,
    VoucherModule,
    FlashSaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
