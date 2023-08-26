import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineProxy } from 'src/entity';

@Module({
    imports: [SequelizeModule.forFeature([MachineProxy], 'machine_proxy')],
    controllers: [ProxyController],
    providers: [ProxyService],
})
export class ProxyModule {}
