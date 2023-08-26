import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './interceptor/http.interceptor';
import { ProxyModule } from './module/proxy/proxy.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { mysqlConfig, seqlizeConfig } from './config/mysql.config';

@Module({
    imports: [
        SequelizeModule.forRoot({
            ...mysqlConfig,
            ...seqlizeConfig,
        }),
        ProxyModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpInterceptor,
        },
    ],
})
export class AppModule {}
