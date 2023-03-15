import { MigrationInterface, QueryRunner } from "typeorm";

export class nazwaMigracji1678869681416 implements MigrationInterface {
    name = 'nazwaMigracji1678869681416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`description\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`description\` varchar(1000) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`shop_item\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop_item\` ADD \`name\` varchar(60) NOT NULL`);
    }

}
