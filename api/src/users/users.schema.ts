import { Schema, Types, Model, Document } from 'mongoose';
import { ITag } from '../tags/tags.schema';
import { INote } from '../notes/notes.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  emailIsVerified: boolean;
  emailToken: string;
  emailTokenExpirationDate: Date;
  googleId: string;
  tags: ITag[];
  notes: INote[];
}

export const UserSchema = new Schema(
  {
    // _id: Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailIsVerified: { type: Boolean, default: false },
    emailToken: String,
    emailTokenExpirationDate: Date,
    googleId: String,
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    notes: [{ type: Types.ObjectId, ref: 'Note' }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

UserSchema.plugin(mongoosePaginate);
