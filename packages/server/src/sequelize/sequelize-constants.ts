import { SequelizeOptions } from "sequelize-typescript"

const {
  SEQUELIZE_PORT = 5432,
  SEQUELIZE_HOST = "localhost",
  SEQUELIZE_DB = "dough_matter",
  USER_NAME = "postgres",
  PASSWORD = "1234",
} = process.env

export const sequelizeOptions: SequelizeOptions = {
  host: SEQUELIZE_HOST,
  port: Number(SEQUELIZE_PORT),
  username: USER_NAME,
  password: PASSWORD,
  database: SEQUELIZE_DB,
  dialect: "postgres", // 'mysql', 'sqlite', 'mariadb', 'mssql'
}
