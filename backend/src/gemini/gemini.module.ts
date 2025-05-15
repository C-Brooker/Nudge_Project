import { forwardRef, Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), forwardRef(() => UsersModule)],
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}
