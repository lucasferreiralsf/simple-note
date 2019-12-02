import { Schema, Types, Document } from 'mongoose';
import { INote } from '../notes/notes.schema';
import { IUser } from '../users/users.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export interface ITag extends Document {
  _id: Types.ObjectId;
  title: string;
  notes: INote[];
  author: IUser;
}

export const TagSchema = new Schema(
  {
    _id: Types.ObjectId,
    title: String,
    notes: [{ type: Types.ObjectId, ref: 'Note' }],
    author: { type: Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

TagSchema.plugin(mongoosePaginate);
