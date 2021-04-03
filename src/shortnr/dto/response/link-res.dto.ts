export class LinkResponseDto {
  slug: string;
  url: string;
  fullUrl: string;
  constructor(slug?: string, url?: string, full?: string) {
    this.slug = slug;
    this.url = url;
    this.fullUrl = full;
  }
}
