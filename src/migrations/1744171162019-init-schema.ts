import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1744171162019 implements MigrationInterface {
    name = 'InitSchema1744171162019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`movedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`taskId\` int NULL, \`stepId\` int NULL, \`movedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`isCompleted\` tinyint NOT NULL DEFAULT 0, \`workflowId\` int NULL, \`currentStepId\` int NULL, \`assignedToId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`step\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`order\` int NOT NULL, \`workflowId\` int NOT NULL, \`isCompleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workflow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task_history\` ADD CONSTRAINT \`FK_158887786322644785a61e6980e\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_history\` ADD CONSTRAINT \`FK_2de215d54480c78d9f9a84ce485\` FOREIGN KEY (\`stepId\`) REFERENCES \`step\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task_history\` ADD CONSTRAINT \`FK_0fa45f36fe7dbe4a69ce0b88761\` FOREIGN KEY (\`movedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4a7490675dae23159db22ddc216\` FOREIGN KEY (\`workflowId\`) REFERENCES \`workflow\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_5df00d9097d0c70f5a966adaf04\` FOREIGN KEY (\`currentStepId\`) REFERENCES \`step\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_fd5f652e2fcdc4a5ab30aaff7a7\` FOREIGN KEY (\`assignedToId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`step\` ADD CONSTRAINT \`FK_18d90a546e0291880b7444e90e2\` FOREIGN KEY (\`workflowId\`) REFERENCES \`workflow\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workflow\` ADD CONSTRAINT \`FK_0b0de9cf6dda31444bb30bfad41\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workflow\` DROP FOREIGN KEY \`FK_0b0de9cf6dda31444bb30bfad41\``);
        await queryRunner.query(`ALTER TABLE \`step\` DROP FOREIGN KEY \`FK_18d90a546e0291880b7444e90e2\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_fd5f652e2fcdc4a5ab30aaff7a7\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_5df00d9097d0c70f5a966adaf04\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4a7490675dae23159db22ddc216\``);
        await queryRunner.query(`ALTER TABLE \`task_history\` DROP FOREIGN KEY \`FK_0fa45f36fe7dbe4a69ce0b88761\``);
        await queryRunner.query(`ALTER TABLE \`task_history\` DROP FOREIGN KEY \`FK_2de215d54480c78d9f9a84ce485\``);
        await queryRunner.query(`ALTER TABLE \`task_history\` DROP FOREIGN KEY \`FK_158887786322644785a61e6980e\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`workflow\``);
        await queryRunner.query(`DROP TABLE \`step\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`task_history\``);
    }

}
