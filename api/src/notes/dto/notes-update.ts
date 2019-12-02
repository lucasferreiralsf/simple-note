import { IsString, IsOptional, IsArray } from 'class-validator';
import { ITag } from 'src/tags/tags.schema';

export class NoteUpdateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  tags?: ITag[];
}
