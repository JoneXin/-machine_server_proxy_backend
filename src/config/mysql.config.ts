import { Dialect } from 'sequelize';
import * as mysql2 from 'mysql2';
const mysqlConf = require('../../config/mysql.config.json');

export type MysqlConf = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};

export const mysqlConfig: MysqlConf = mysqlConf;

export const seqlizeConfig = {
    dialect: 'mysql' as Dialect,
    name: 'machine_proxy', // 某次数据连接的名字，也可以理解为，数据库的别名
    autoLoadModels: true,
    synchronize: false,
    timezone: '+08:00',
    logging: true,
    query: { raw: true },
    dialectModule: mysql2,
};
