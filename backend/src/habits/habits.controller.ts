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
import {
  CreateHabitDto,
  UpdateHabitDto,
  MarkCompletionDto,
} from './dto/habit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HabitService } from './habits.service';

@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto, @Request() req: any) {
    return this.habitService.create(createHabitDto, req.user.id);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.habitService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.habitService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHabitDto: UpdateHabitDto,
    @Request() req: any,
  ) {
    return this.habitService.update(id, updateHabitDto, req.user.id);
  }

  @Post(':id/complete')
  markComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body() markCompletionDto: MarkCompletionDto,
    @Request() req: any,
  ) {
    return this.habitService.markComplete(
      id,
      req.user.id,
      markCompletionDto.date,
    );
  }

  @Post(':id/incomplete')
  markIncomplete(
    @Param('id', ParseIntPipe) id: number,
    @Body() markCompletionDto: MarkCompletionDto,
    @Request() req: any,
  ) {
    return this.habitService.markIncomplete(
      id,
      req.user.id,
      markCompletionDto.date,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.habitService.remove(id, req.user.id);
  }

  @Delete()
  clearAll(@Request() req: any) {
    return this.habitService.clearAllHabits(req.user.id);
  }
}
