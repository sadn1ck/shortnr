import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ShortnrController } from './shortnr.controller';
import { ShortnrService } from './shortnr.service';

@Module({
  controllers: [ShortnrController],
  providers: [ShortnrService, PrismaService],
})
export class ShortnrModule {}
