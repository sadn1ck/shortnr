import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortnrModule } from './shortnr/shortnr.module';

@Module({
  imports: [ShortnrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
