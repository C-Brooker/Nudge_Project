import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/habit.entity';
import { CompletionEntry } from './entities/completion-entry.entity';
import { CreateHabitDto, UpdateHabitDto } from './dto/habit.dto';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
    @InjectRepository(CompletionEntry)
    private completionRepository: Repository<CompletionEntry>,
  ) {}

  async create(createHabitDto: CreateHabitDto, userId: string): Promise<Habit> {
    const habit = this.habitRepository.create({
      ...createHabitDto,
      userId,
    });

    return this.habitRepository.save(habit);
  }

  async findAll(userId: string): Promise<Habit[]> {
    return this.habitRepository.find({
      where: { userId },
      relations: ['completions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: string): Promise<Habit> {
    const habit = await this.habitRepository.findOne({
      where: { id, userId },
      relations: ['completions'],
    });

    if (!habit) {
      throw new NotFoundException(`Habit with ID ${id} not found`);
    }

    return habit;
  }

  async update(
    id: number,
    updateHabitDto: UpdateHabitDto,
    userId: string,
  ): Promise<Habit> {
    const habit = await this.findOne(id, userId);

    Object.assign(habit, updateHabitDto);
    return this.habitRepository.save(habit);
  }

  async remove(id: number, userId: string): Promise<void> {
    const habit = await this.findOne(id, userId);
    await this.habitRepository.remove(habit);
  }

  async markComplete(
    id: number,
    userId: string,
    date?: string,
  ): Promise<Habit> {
    await this.findOne(id, userId);
    const targetDate = date || this.getTodayISOString();

    let completion = await this.completionRepository.findOne({
      where: { habitId: id, date: targetDate },
    });

    if (completion) {
      completion.completed = true;
      completion.timestamp = new Date();
    } else {
      completion = this.completionRepository.create({
        habitId: id,
        date: targetDate,
        completed: true,
        timestamp: new Date(),
      });
    }

    await this.completionRepository.save(completion);

    return this.findOne(id, userId);
  }

  async markIncomplete(
    id: number,
    userId: string,
    date?: string,
  ): Promise<Habit> {
    await this.findOne(id, userId);
    const targetDate = date || this.getTodayISOString();

    let completion = await this.completionRepository.findOne({
      where: { habitId: id, date: targetDate },
    });

    if (completion) {
      completion.completed = false;
      completion.timestamp = undefined;
    } else {
      completion = this.completionRepository.create({
        habitId: id,
        date: targetDate,
        completed: false,
      });
    }

    await this.completionRepository.save(completion);

    return this.findOne(id, userId);
  }

  async clearAllHabits(userId: string): Promise<void> {
    await this.habitRepository.delete({ userId });
  }

  //Helper function
  private getTodayISOString(): string {
    return new Date().toISOString().split('T')[0];
  }
}
