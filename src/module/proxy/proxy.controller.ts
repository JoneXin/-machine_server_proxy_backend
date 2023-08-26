import { Controller, Get, Post } from '@nestjs/common';
import { ProxyService } from './proxy.service';
@Controller('px')
export class ProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @Get('/')
    async getProxyList() {
        return await this.proxyService.getProxyList();
    }

    @Post('/buck')
    addProxy() {}

    @Get('/delete')
    deleteProxy() {}
}
