import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkRequestDto } from './dto/request/link.dto';
import { ShortnrService } from './shortnr.service';

@Controller('')
export class ShortnrController {
  constructor(private shortnrService: ShortnrService) {}
  @Post('shortnr/create')
  async createShortenedLink(@Body() data: LinkRequestDto) {
    return this.shortnrService.createLink(data);
  }
  @Get(':slug')
  async redirectToURL(@Param() params: { slug: string }, @Res() res: Response) {
    if (params.slug === 'favicon.ico') {
      return { statusCode: 204 };
    }
    const data = await this.shortnrService.redirectToStoredURL(params.slug);
    res.redirect(data.url);
  }
}
