require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [env === 'development' ? `${__dirname}/src/entities/**/*.ts` : `${__dirname}/dist/src/entities/**/*.js`],
  logging: true,
  synchronize: false,
  pool: { min: 2, max: 10 },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: [env === 'development' ? 'migration/*.ts' : 'dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};
