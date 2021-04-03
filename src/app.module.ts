import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ShortnrModule } from 'src/shortnr/shortnr.module';
import config from 'src/config';

@Module({
  imports: [
    ShortnrModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/ui',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({ load: [config] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
