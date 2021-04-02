import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shortnr/prisma.service';
import { Link, Prisma } from '@prisma/client';
import { LinkRequestDto } from './dto/request/link.dto';
import { nanoid } from 'nanoid';
import { RedirectDto } from './dto/response/redirect.dto';
@Injectable()
export class ShortnrService {
  constructor(private prisma: PrismaService) {}

  async link(
    linkWhereUniqueInput: Prisma.LinkWhereUniqueInput,
  ): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: linkWhereUniqueInput,
    });
  }

  async createLink(data: LinkRequestDto): Promise<Link> {
    console.log(`slug is -> ${data.slug}`);
    const slug =
      data.slug === '' || data.slug === undefined ? nanoid(7) : data.slug;
    const creationData: Prisma.LinkCreateInput = {
      url: data.url,
      slug,
    };
    return this.prisma.link.create({
      data: creationData,
    });
  }
  async redirectToStoredURL(slugParam: string) {
    const found = await this.prisma.link.findUnique({
      where: {
        slug: slugParam,
      },
    });
    if (!found) {
      return { statusCode: 404 };
    }
    const redirect = new RedirectDto(found.url, 302);
    return redirect;
  }
}
