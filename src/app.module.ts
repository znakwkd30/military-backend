import {
  Module,
  NestModule,
  MiddlewareConsumer,
  OnApplicationBootstrap
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { MilitaryModule } from './modules/military/military.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env/local.env',
      ignoreEnvFile: process.env.ENV !== 'local'
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.ENV !== 'prod' ? 'trace' : 'info'
      }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      autoLoadEntities: true,
      maxQueryExecutionTime: 1000,
      logging: process.env.ENV === 'prod' ? ['error'] : true
      // synchronize: process.env.ENV === 'local',
    }),
    MilitaryModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly refHost: HttpAdapterHost<any>) {}

  onApplicationBootstrap() {
    const server = this.refHost.httpAdapter.getHttpServer();
    server.keepAliveTimeout = 910 * 1000;
    server.headersTimeout = 910 * 1000;
  }

  configure(consumer: MiddlewareConsumer) {}
}
