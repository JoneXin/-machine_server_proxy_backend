import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MachineProxy } from 'src/entity';
import { NodeRedis } from 'src/lib/redis';

@Injectable()
export class ProxyService {
    private logger = new Logger(ProxyService.name);
    private redisClient: NodeRedis;

    constructor(@InjectModel(MachineProxy, 'machine_proxy') readonly proxyModel: typeof MachineProxy) {
        this.redisClient = new NodeRedis();
    }

    async getProxyList() {
        try {
            return JSON.parse((await this.redisClient.get('proxyList')) || []);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
