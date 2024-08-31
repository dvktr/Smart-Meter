import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableCustomer1725056716309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO customer VALUES (1, 'Teste', '2024-08-30', 'e3a9de1c-ab52-446c-a208-aa377ddf1f5c')  
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM customer   
   `);
  }
}
