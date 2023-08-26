import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './lib/logger';
import { appConfig } from './config/app.config';
import { ProxyHandler } from './middleware/proxy.middleware';
import { mysqlConfig } from './config/mysql.config';

async function bootstrap() {
    const logger = new Logger();

    const app = await NestFactory.create(AppModule, {
        logger: logger,
    });

    app.setGlobalPrefix('api');

    app.use('/api/proxy', new ProxyHandler(mysqlConfig).handleProxy);

    await app.listen(appConfig.port, '0.0.0.0', () => {
        logger.log(`server running success in http://127.0.0.1:${appConfig.port}`);
        logger.log(`swagger document running in http://127.0.0.1:${appConfig.port}/doc`);
    });
}
bootstrap();
