import config from 'src/config';

export class RedirectDto {
  url: string;
  statusCode: number;
  constructor(url?: string, statusCode?: number) {
    this.url = url ?? config().baseURL;
    this.statusCode = statusCode ?? 302;
  }
}
