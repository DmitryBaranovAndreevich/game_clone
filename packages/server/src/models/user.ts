import { DataTypes, Model, Sequelize } from "sequelize"
import { IUser } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<
    Model<{ id: number; updatedAt?: string; createdAt?: string } & IUser, IUser>
  >("users", {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(),
    },
    second_name: {
      type: DataTypes.STRING(),
    },
    phone: {
      type: DataTypes.STRING(),
    },
    login: {
      type: DataTypes.STRING(),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(),
    },
  })
}
