import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TesMiddleware } from './middlewares/tes.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');

    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
    consumer.apply(TesMiddleware).forRoutes('*');
  }
}
