/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  export interface ProcessEnv {
    DB_USERNAME: string;
    DB_PASS: string;
    DB_NAME: string;
    DB_PORT: string;
    DB_HOST: string;
  }
}
