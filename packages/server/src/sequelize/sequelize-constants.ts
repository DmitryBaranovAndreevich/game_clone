import { SequelizeOptions } from "sequelize-typescript"

const {
  SEQUELIZE_PORT = 5432,
  SEQUELIZE_HOST = "localhost",
  POSTGRES_DB = "dough_matter",
  POSTGRES_USER = "postgres",
  POSTGRES_PASSWORD = "1234",
} = process.env

export const sequelizeOptions: SequelizeOptions = {
  host: SEQUELIZE_HOST,
  port: Number(SEQUELIZE_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: "postgres", // 'mysql', 'sqlite', 'mariadb', 'mssql'
}
