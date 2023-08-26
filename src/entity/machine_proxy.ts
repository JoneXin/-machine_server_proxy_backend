import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';

@Table({ tableName: 'proxy', timestamps: false })
export class MachineProxy extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: '自增主键' })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    uid?: number;

    @Column({
        field: 'source_path',
        allowNull: true,
        type: DataType.STRING(255),
    })
    sourcePath?: string;

    @Column({
        field: 'target_path',
        allowNull: true,
        type: DataType.STRING(255),
    })
    targetPath?: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    ip?: string;

    @Column({ field: 'port', allowNull: true, type: DataType.INTEGER })
    port?: number;

    @Column({ field: 'change_origin', allowNull: true, type: DataType.INTEGER })
    changeOrigin?: number;

    @Column({ field: 'path_rewrite', allowNull: true, type: DataType.STRING(255) })
    pathRewrite?: string;

    @Column({ field: 'desc', allowNull: true, type: DataType.STRING(255) })
    desc?: string;
}
