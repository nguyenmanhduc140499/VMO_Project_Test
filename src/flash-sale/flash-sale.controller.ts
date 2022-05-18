import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';
import { CreateFlashSaleDTO } from './dto/createFlaseSale.dto';
import EmailScheduleDto from './dto/emailSchedule.dto';
import { FlashSaleService } from './flash-sale.service';

@Controller('flash-sale')
export class FlashSaleController {
  constructor(private readonly FSservice: FlashSaleService) {}

  @Post(':FsJob')
  async createFS(
    @Body() createFlashSaleDto: CreateFlashSaleDTO,
    @Body() emailSchedule: EmailScheduleDto,
    @Param('FsJob') nameJob: string,
  ) {
    const flashSale = await this.FSservice.addCronJobCreateFS(
      nameJob,
      createFlashSaleDto,
      emailSchedule,
    );
    return flashSale;
  }
}
