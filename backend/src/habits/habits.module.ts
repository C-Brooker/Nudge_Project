import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitService } from './habits.service';
import { HabitController } from './habits.controller';
import { Habit } from './entities/habit.entity';
import { CompletionEntry } from './entities/completion-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, CompletionEntry])],
  controllers: [HabitController],
  providers: [HabitService],
  exports: [HabitService], // Export if needed by other modules
})
export class HabitModule {}
