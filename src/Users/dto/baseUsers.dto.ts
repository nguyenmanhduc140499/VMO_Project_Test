import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class BaseUserDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  passWord: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  role: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: Object })
  voucher?: {
    IdVoucher: string;
    value: number;
    state: boolean;
  };

  // auth: {
  //   email: {
  //     valid: boolean;
  //   };
  // };
}
