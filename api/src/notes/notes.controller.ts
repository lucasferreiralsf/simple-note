import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteCreateDto } from './dto/notes-create';
import { NoteUpdateDto } from './dto/notes-update';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req, @Query('page') page?, @Query('perPage') perPage?) {
    return await this.noteService.getAll(page, perPage, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(@Request() req, @Param('id') id: string) {
    return await this.noteService.findBy({ id }, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createNote(@Request() req, @Body() note: NoteCreateDto) {
    return await this.noteService.storeNote(note, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateNote(@Request() req, @Param('id') id: string, @Body() note: NoteUpdateDto) {
    return await this.noteService.updateNote({ _id: id }, note, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteNote(@Request() req, @Param('id') id: string) {
    return await this.noteService.deleteNote({ _id: id }, req.user.userId);
  }
}
