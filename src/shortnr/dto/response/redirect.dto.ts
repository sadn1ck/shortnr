export class RedirectDto {
  url: string;
  statusCode: number;
  constructor(url?: string, statusCode?: number) {
    this.url = url ?? 'https://google.com';
    this.statusCode = statusCode ?? 302;
  }
}
