import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkRequestDto } from './dto/request/link.dto';
import { ShortnrService } from './shortnr.service';

@Controller('s')
export class ShortnrController {
  constructor(private shortnrService: ShortnrService) {}
  @Post('create')
  async createShortenedLink(@Body() linkRequestDto: LinkRequestDto) {
    return this.shortnrService.createLink(linkRequestDto);
  }
  @Get(':slug')
  async redirectToURL(@Param() params: { slug: string }, @Res() res: Response) {
    const data = await this.shortnrService.redirectToStoredURL(params.slug);
    res.redirect(data.url);
  }
}
