import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntryService } from './journal.service';
import { JournalEntryController } from './journal.controller';
import { JournalEntry } from './entities/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry])],
  controllers: [JournalEntryController],
  providers: [JournalEntryService],
  exports: [JournalEntryService],
})
export class JournalEntryModule {}
