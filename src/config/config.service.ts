import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import dotenv = require('dotenv');
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sm_db',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['./dist/migrations/*.{ts,js}'],
      migrationsRun: true,
      autoLoadEntities: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([]);

export { configService };
