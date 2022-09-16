require('dotenv').config();
import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;
console.log(c);
console.log(process.env);
console.log(process.env.POSTGRES_USERNAME);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.DATABASE_DIALECT);
console.log(process.env.POSTGRES_DATABASE);
console.log(process.env.POSTGRES_HOST);
// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  dialect: 'postgres',
  storage: ':memory:',
});

