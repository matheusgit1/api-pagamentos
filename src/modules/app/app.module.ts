import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../../infrastructure/interceptors/logging.interceptor';
import { PaymentsModule } from '../payments/payments.module';
import { PaymentsController } from '../payments/payments.controller';
import { PaymentsService } from '../payments/payments.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PaymentsModule],
  controllers: [AppController, PaymentsController],
  providers: [
    AppService,
    PaymentsService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [JwtService, PaymentsService],
})
export class AppModule {}
