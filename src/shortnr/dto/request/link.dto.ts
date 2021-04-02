import { IsString, Length, IsUrl } from 'class-validator';

export class LinkRequestDto {
  @IsString()
  @Length(5, 50, {
    message: 'Slug should have minimum length of 5 and maximum of 50',
  })
  slug?: string;

  // @TODO: Fix URL validation
  @IsString()
  @IsUrl({}, { always: true })
  url: string;
}
