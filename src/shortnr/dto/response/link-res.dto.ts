export class LinkResponseDto {
  slug: string;
  url: string;
  constructor(slug?: string, url?: string) {
    this.slug = slug;
    this.url = url;
  }
}
