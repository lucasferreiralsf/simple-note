import { Schema, Types, Document } from 'mongoose';
import { ITag } from '../tags/tags.schema';
import { IUser } from '../users/users.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export interface INote extends Document {
  _id: Types.ObjectId;
  firstName: Number;
  lastName: String;
  email: String;
  emailIsVerified: Boolean;
  emailToken: String;
  emailTokenExpirationDate: Date;
  googleId: String;
  tags: ITag[];
  author: IUser;
}

export const NoteSchema = new Schema(
  {
    title: String,
    content: String,
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    author: { type: Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

NoteSchema.plugin(mongoosePaginate);
