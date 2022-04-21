import { MigrationInterface, QueryRunner } from 'typeorm';
export default class AddGstinToAddress implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
