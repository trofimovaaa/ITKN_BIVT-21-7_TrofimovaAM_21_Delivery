import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1679604995144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

// npx typeorm-ts-node-esm migration:create src/database/migration/initial
