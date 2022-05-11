import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class EmailScheduleDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'recipient' })
  recipient?: string;

  @ApiProperty({ type: String, description: 'content' })
  content?: string;
}

export default EmailScheduleDto;
