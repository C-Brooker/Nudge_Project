import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateCountGoalDto {
  type: 'Count';

  @IsNumber()
  @Min(1)
  count: number;

  @IsString()
  @IsNotEmpty()
  units: string;

  @IsString()
  @IsNotEmpty()
  timeframe: string;
}

export class CreateQuitGoalDto {
  type: 'Quit';

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsBoolean()
  milestones: boolean;
}

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: CreateCountGoalDto, name: 'Count' },
        { value: CreateQuitGoalDto, name: 'Quit' },
      ],
    },
  })
  goal: CreateCountGoalDto | CreateQuitGoalDto;

  @IsNumber()
  @Min(0)
  @Max(4)
  difficulty: 0 | 1 | 2 | 3 | 4;
}

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  color?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: CreateCountGoalDto, name: 'Count' },
        { value: CreateQuitGoalDto, name: 'Quit' },
      ],
    },
  })
  goal?: CreateCountGoalDto | CreateQuitGoalDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  difficulty?: 0 | 1 | 2 | 3 | 4;
}

export class MarkCompletionDto {
  @IsOptional()
  @IsDateString()
  date?: string;
}
