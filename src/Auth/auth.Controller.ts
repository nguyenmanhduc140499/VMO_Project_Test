import { LoginDTO } from 'src/Users/dto/Login.dto';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { Users, UsersDocument } from 'src/Users/Schema/User.schema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { BaseUserDTO } from 'src/Users/dto/baseUsers.dto';
import { UsersService } from 'src/Users/user.Service';
import { ResponseSuccess, ResponseError } from 'src/common/dto/response.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User login' })
  async login(@Body() reqUse: LoginDTO, @Req() req: Request) {
    const user = req.user as UsersDocument;
    return await this.authservice.login(user);
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'User registration' })
  async register(@Body() regUse: BaseUserDTO): Promise<Users> {
    const users = await this.authservice.signUp(regUse);
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async userProfile(@Req() request: Request) {
    return request.user;
  }
}
