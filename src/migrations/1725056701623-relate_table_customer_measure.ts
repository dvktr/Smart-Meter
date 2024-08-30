import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelateTableCustomerMeasure1725056701623
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE measure ADD CONSTRAINT measure_customer
                FOREIGN KEY (customer_id)
                REFERENCES customer (id)
                ON DELETE  RESTRICT 
                ON UPDATE  CASCADE 
                NOT DEFERRABLE 
                INITIALLY IMMEDIATE
            ;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE measure DROP CONSTRAINT measure_customer;    
        `);
  }
}
