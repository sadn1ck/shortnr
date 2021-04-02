import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { LinkRequestDto } from './dto/request/link.dto';
import { ShortnrService } from './shortnr.service';

@Controller('')
export class ShortnrController {
  constructor(private shortnrService: ShortnrService) {}
  @Post('shortnr/create')
  async createShortenedLink(@Body() data: LinkRequestDto) {
    console.log(data);
    return this.shortnrService.createLink(data);
  }
  @Get(':slug')
  @Redirect()
  async redirectToURL(@Param() params: { slug: string }) {
    if (params.slug === 'favicon.ico') {
      return { statusCode: 204 };
    }
    return this.shortnrService.redirectToStoredURL(params.slug);
  }
}
