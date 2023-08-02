import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GetAllPaymentDto } from './dto/get-all-payment.dto';
import { Paging } from 'src/utils/types/paging.types';
import { GetCurrentUserId } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Public } from 'src/common/constants';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @UseGuards(RtGuard)
  @Post()
  create(
    @GetCurrentUserId() userId: number,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.create(userId, createPaymentDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get()
  findAll(@Query() getAllPaymentDto: GetAllPaymentDto): Promise<Paging> {
    return this.paymentService.findAll(getAllPaymentDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
