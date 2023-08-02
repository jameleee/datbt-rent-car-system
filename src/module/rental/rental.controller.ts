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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Paging } from 'src/utils/types/paging.types';
import { GetAllRentalDto } from './dto/get-all-rental.dto';
import { GetCurrentUserId } from 'src/common/decorators';
import { GetCurrentUserEmail } from 'src/common/decorators/get-current-user-email.decorator';
import { Public } from 'src/common/constants';
import { RtGuard } from 'src/common/guards';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Public()
  @UseGuards(RtGuard)
  @Post()
  create(
    @GetCurrentUserId() userId: number,
    @GetCurrentUserEmail() useEmail: string,
    @Body() createRentalDto: CreateRentalDto,
  ) {
    return this.rentalService.create(userId, useEmail, createRentalDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get()
  findAll(@Query() getAllRentalDto: GetAllRentalDto): Promise<Paging> {
    return this.rentalService.findAll(getAllRentalDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(+id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(+id, updateRentalDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(+id);
  }
}
