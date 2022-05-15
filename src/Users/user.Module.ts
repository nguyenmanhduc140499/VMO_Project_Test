import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherModule } from 'src/Voucher/voucher.module';
import { Users, UserSchema } from './Schema/User.schema';
import { UsersController } from './user.controller';
import { UsersService } from './user.Service';

@Module({
  imports: [
    VoucherModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
