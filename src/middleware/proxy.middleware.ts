import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request } from 'express';
import { MysqlConf } from 'src/config/mysql.config';
import { Options, Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';
import { NodeRedis } from 'src/lib/redis';

export class ProxyHandler {
    private mysqlConf: MysqlConf;
    private seq: Sequelize;
    private readonly seqIOpt: Options = {
        logging: true,
        dialect: 'mysql',
        timezone: '+08:00',
        query: { raw: true },
        dialectModule: mysql2,
    };
    private redisClient: NodeRedis;

    constructor(mysqlConfig: MysqlConf) {
        this.mysqlConf = mysqlConfig;
        this.redisClient = new NodeRedis();
        this.initSeqInstance();
    }

    initSeqInstance() {
        this.seq = new Sequelize({
            ...this.mysqlConf,
            ...this.seqIOpt,
        });
    }

    async handleProxy(req: Request, res) {
        console.log(req.url);

        const proxyList = JSON.parse(await this.redisClient.get('proxyList'));

        if (!proxyList || proxyList.length) return '代理列表为空';

        for (let i = 0; i < proxyList.length; i++) {
            const proxyConfig = proxyList[i];
            if ((proxyConfig.path = req.url)) {
                return;
            }
        }

        return `无${req.url}对应的代理配置`;
    }
}
