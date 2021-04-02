import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shortnr/prisma.service';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import config from 'src/config';
import {
  CustomException,
  CustomServerException,
} from 'src/exceptions/exceptions';
import { LinkRequestDto } from 'src/shortnr/dto/request/link.dto';
import { RedirectDto } from 'src/shortnr/dto/response/redirect.dto';
import { LinkResponseDto } from 'src/shortnr/dto/response/link-res.dto';

@Injectable()
export class ShortnrService {
  constructor(private prisma: PrismaService) {}
  // function to check if slug already exists in db
  async doesSlugAlreadyExist(
    slug: string,
  ): Promise<boolean | CustomServerException> {
    try {
      const found = await this.prisma.link.findMany({
        where: { slug: slug },
      });
      if (found.length === 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return new CustomServerException(
        'Error while accessing database, please resent request',
      );
    }
  }
  async createLink(
    data: LinkRequestDto,
  ): Promise<LinkResponseDto | CustomException | CustomServerException> {
    // @TODO: Validate URL, if not, return invalid url with 401 and pretty message
    try {
      const slug =
        data.slug === '' || data.slug === undefined ? nanoid(7) : data.slug;
      if (await this.doesSlugAlreadyExist(slug)) {
        return new CustomException(
          'Please provide another slug as this one is already in use!',
        );
      }

      const creationData: Prisma.LinkCreateInput = {
        url: data.url,
        slug,
      };
      const createdLink = await this.prisma.link.create({
        data: creationData,
      });
      return new LinkResponseDto(createdLink.slug, createdLink.url);
    } catch (error) {
      return new CustomServerException(
        'Error while accessing database, please resent request',
      );
    }
  }

  // redirect to correct url
  async redirectToStoredURL(slugParam: string): Promise<RedirectDto> {
    const found = await this.prisma.link.findUnique({
      where: {
        slug: slugParam,
      },
    });
    if (!found) {
      return new RedirectDto(`${config().baseURL}/404`, 404);
    }
    return new RedirectDto(found.url, 302);
  }
}
