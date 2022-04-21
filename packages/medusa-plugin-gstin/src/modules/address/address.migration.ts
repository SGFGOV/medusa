import { Migration } from 'medusa-extender';
import { MigrationInterface, QueryRunner } from 'typeorm';

@Migration()
export default class AddGstinToAddress implements MigrationInterface {
	name = `addGstinToAddress_${Date.now()}`;

	public async up(queryRunner: QueryRunner): Promise<void> {
		const query = `ALTER TABLE public."address" ADD COLUMN IF NOT EXISTS "gstin" text;`;
		await queryRunner.query(query);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const query = `ALTER TABLE public."address" DROP COLUMN "gstin";`;
		await queryRunner.query(query);
	}
}
