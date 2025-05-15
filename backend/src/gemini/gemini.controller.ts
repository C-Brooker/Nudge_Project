import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { InsertMessageDto } from './dto/insert-message.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  async sendMessageToGemini(@Body() body: InsertMessageDto) {
    const reply = await this.geminiService.chatHandler(body);
    return { message: reply };
  }

  @Get('history')
  async history(@Query('userId') userId: number) {
    return this.geminiService.getHistory(+userId);
  }

  @Delete('history')
  async clearHistory(@Query('userId') userId: number) {
    await this.geminiService.clearHistory(userId);
    return { message: 'Chat history cleared.' };
  }
}
