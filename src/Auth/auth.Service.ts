import { BaseUserDTO } from 'src/Users/dto/baseUsers.dto';
import { MailService } from './../mail/mail.service';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users, UsersDocument } from 'src/Users/Schema/User.schema';
import { UsersService } from 'src/Users/user.Service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailVerification } from './interfaces/emailVerification.interface';
import { User } from 'src/Authorization/user.entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('EmailVerification')
    private readonly emailVerificationModel: Model<EmailVerification>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findName(username);
    if (user && user.passWord === pass) {
      const { passWord, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UsersDocument) {
    const payload = {
      //data you need to keep
      role: user.role,
      sub: user._id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(userRegister: BaseUserDTO): Promise<Users> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const user = await this.usersService.create(userRegister);
    const idUser = user.id;
    await this.mailService.sendUserConfirm(idUser, token);
    return user;
  }
}
