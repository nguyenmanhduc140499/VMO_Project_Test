import { UsersService } from 'src/Users/user.Service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService,
  ) {}
  async sendUserConfirm(id: string, token: string): Promise<void> {
    const user = await this.usersService.findOne(id);
    const url = `example.com/auth/comfirm?token=${token}`;
    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Hi. Comfirm your Email',
        template: './src/mail/templates/confirmation',
        context: {
          name: user.userName,
          url: url,
        },
      })
      .then((r) => {
        console.log(r, 'email is sent');
      })
      .catch((e) => {
        console.log(e, 'error sending email');
      });
  }

  async sendMailFlashSale(email: string): Promise<void> {
    console.log(email);
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Hi. Flash Sale started',
        template: './src/mail/templates/FlashSale',
        context: {
          name: email,
        },
      })
      .then((r) => {
        console.log(r, 'email is sent');
      })
      .catch((e) => {
        console.log(e, 'error sending email');
      });
  }
}
