import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMeasure1724954454402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE measure (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY  NOT NULL,
            created_at date  NOT NULL,
            type varchar(255)  NOT NULL,
            value decimal(10,2)  NOT NULL,
            image_url varchar(255)  NOT NULL,
            confirmed boolean  NOT NULL DEFAULT false,
            customer_id int  NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE measure    
    `);
  }
}
