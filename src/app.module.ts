import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ShortnrModule } from 'src/shortnr/shortnr.module';

@Module({
  imports: [
    ShortnrModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/ui',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
