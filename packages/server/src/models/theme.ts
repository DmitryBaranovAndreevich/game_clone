import { DataTypes, Model, Sequelize } from "sequelize"
import { TTheme } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<
    Model<
      { id: number; updatedAt?: string; createdAt?: string } & TTheme,
      TTheme
    >
  >("theme", {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    owner: {
      type: DataTypes.INTEGER(),
    },
    theme: {
      type: DataTypes.STRING(),
    },
  })
}
