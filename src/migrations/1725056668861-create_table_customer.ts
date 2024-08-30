import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomer1725056668861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE customer (
                id serial NOT NULL,
                name varchar(255) NOT NULL,
                created_at date  NOT NULL,
                code varchar(255) NOT NULL,
                CONSTRAINT customer_pk PRIMARY KEY (id),
                CONSTRAINT code_unique UNIQUE (code)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE customer    
        `);
  }
}
