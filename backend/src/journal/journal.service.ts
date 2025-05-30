import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntry } from './entities/journal.entity';
import { CreateJournalEntryDto } from './dto/create-journal.dto';
import { UpdateJournalEntryDto } from './dto/update-journal.dto';

@Injectable()
export class JournalEntryService {
  constructor(
    @InjectRepository(JournalEntry)
    private journalEntryRepository: Repository<JournalEntry>,
  ) {}

  async create(
    createJournalEntryDto: CreateJournalEntryDto,
    userId: string,
  ): Promise<JournalEntry> {
    const journalEntry = this.journalEntryRepository.create({
      ...createJournalEntryDto,
      userId,
      color: createJournalEntryDto.color || '#F6F6F6',
      habit: createJournalEntryDto.habit || null,
    });

    return this.journalEntryRepository.save(journalEntry);
  }

  async findAll(userId: string): Promise<JournalEntry[]> {
    return this.journalEntryRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: string): Promise<JournalEntry> {
    const journalEntry = await this.journalEntryRepository.findOne({
      where: { id, userId },
    });

    if (!journalEntry) {
      throw new NotFoundException(`Journal entry with ID ${id} not found`);
    }

    return journalEntry;
  }

  async update(
    id: number,
    updateJournalEntryDto: UpdateJournalEntryDto,
    userId: string,
  ): Promise<JournalEntry> {
    const journalEntry = await this.findOne(id, userId);

    Object.assign(journalEntry, updateJournalEntryDto);
    return this.journalEntryRepository.save(journalEntry);
  }

  async remove(id: number, userId: string): Promise<void> {
    const journalEntry = await this.findOne(id, userId);
    await this.journalEntryRepository.remove(journalEntry);
  }

  async clearAll(userId: string): Promise<void> {
    await this.journalEntryRepository.delete({ userId });
  }
}
