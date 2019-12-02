import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GenericService } from '../utils/generics/generic-service.generic';
import { ConfigService } from '../config/config.service';
import { NoteCreateDto } from './dto/notes-create';
import { NoteWithTagsAndUsers } from './notes.fragment';
import { removeElementObject } from '../utils/helpers/remove-element-object';
import { NoteUpdateDto } from './dto/notes-update';
import { INote } from './notes.schema';

@Injectable()
export class NotesService extends GenericService<INote, NoteCreateDto, NoteUpdateDto> {
  constructor(private readonly configService: ConfigService, @InjectModel('Note') private readonly noteModel: Model<INote> & {paginate: any}) {
    super(noteModel);
  }

  async storeNote(note: NoteCreateDto, userId: string) {
    const noteCreated = await this.noteModel.create(
      {
        author: userId,
        content: `{
          "document": {
            "nodes": [
              {
                "object": "block",
                "type": "paragraph",
                "nodes": [
                  {
                    "object": "text",
                    "text": ""
                  }
                ]
              }
            ]
          }
        }`,
      },
    );

    return noteCreated;
  }

  async updateNote(field: { _id: string }, note: NoteUpdateDto, userId: string) {
    const noteReduced = removeElementObject(note, ['tags']);
    const noteUpdated = await this.update(
      field,
      note,
    );

    return noteUpdated;
  }

  async deleteNote(field: { _id: string }, userId: string) {
    const data = {
      where: { id: userId },
      data: {
        notes: {
          delete: { id: field._id },
        },
      },
    };
    const noteDeleted = await this.delete(field);

    return noteDeleted;
  }

  async findBy(field: { id: string }, userId: string) {
    return await this.fetchBy(field);
  }

  async getAll(currentPage: string, perPage: string, userId: string) {
    return await this.noteModel.paginate(
      currentPage,
      perPage,
      { author: { _id: userId } },
    );
  }
}
