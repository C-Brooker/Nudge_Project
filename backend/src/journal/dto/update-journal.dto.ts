import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateJournalEntryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  habit?: string | null;
}
