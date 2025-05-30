import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JournalEntryService } from './journal.service';
import { CreateJournalEntryDto } from './dto/create-journal.dto';
import { UpdateJournalEntryDto } from './dto/update-journal.dto';

@UseGuards(JwtAuthGuard)
@Controller('journal')
export class JournalEntryController {
  constructor(private readonly journalEntryService: JournalEntryService) {}

  @Post()
  create(
    @Body() createJournalEntryDto: CreateJournalEntryDto,
    @Request() req: any,
  ) {
    return this.journalEntryService.create(createJournalEntryDto, req.user.id);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.journalEntryService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.journalEntryService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJournalEntryDto: UpdateJournalEntryDto,
    @Request() req: any,
  ) {
    return this.journalEntryService.update(
      id,
      updateJournalEntryDto,
      req.user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.journalEntryService.remove(id, req.user.id);
  }

  @Delete()
  clearAll(@Request() req: any) {
    return this.journalEntryService.clearAll(req.user.id);
  }
}
