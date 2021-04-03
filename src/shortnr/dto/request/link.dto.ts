import { IsString, Length, IsUrl } from 'class-validator';

export class LinkRequestDto {
  @IsUrl({}, { message: 'URL provided is not valid', always: true })
  @Length(2, 200, {
    message: 'URL should have minimum length of 1 and max of 200',
  })
  readonly url: string;

  @IsString()
  @Length(2, 50, {
    message: 'Slug should have minimum length of 5 and maximum of 50',
  })
  readonly slug?: string;
}
