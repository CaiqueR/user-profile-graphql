require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/src/entities/**/*.${env === 'development' ? 'ts' : 'js'}`],
  logging: true,
  synchronize: false,
  pool: { min: 2, max: 10 },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: [`migration/*.${env === 'development' ? 'ts' : 'js'}`],
  cli: {
    migrationsDir: 'migration',
  },
};
