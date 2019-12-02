import { IsString, IsOptional, IsArray } from 'class-validator';

export class NoteCreateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  tags?: Array<{ id: string }>;
}
