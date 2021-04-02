import { IsString, Length, IsOptional, IsUrl } from 'class-validator';

export class LinkRequestDto {
  @IsString()
  @Length(0, 50)
  @IsOptional()
  slug?: string;

  @IsString()
  @Length(0, 200)
  @IsUrl({ require_tld: true })
  url: string;
}
