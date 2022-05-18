import { RolesGuard } from './../Authorization/roles/roles.guard';
import { UsersService } from 'src/Users/user.Service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailVerificationSchema } from './schema/emailverification.schema';
import { AuthController } from './auth.Controller';
import { Users, UserSchema } from 'src/Users/schema/user.schema';
import { UsersModule } from './../Users/user.Module';
import { MailModule } from './../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EmailVerification', schema: EmailVerificationSchema },
    ]),
    UsersModule,
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  // RolesGuard
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
