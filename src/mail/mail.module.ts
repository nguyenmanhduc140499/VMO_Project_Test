import { UsersModule } from './../Users/user.Module';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';

@Module({
  imports: [
    UsersModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            service: config.get('EMAIL_SERVICE'),
            auth: {
              user: config.get('EMAIL_USER'),
              pass: config.get('EMAIL_PASSWORD'),
            },
          },

          defaults: {
            from: 'nguyenmanhduc406@gmail.com',
          },
          preview: true,
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
