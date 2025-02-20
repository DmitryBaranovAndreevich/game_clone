import { DataTypes, Model, Sequelize } from "sequelize"
import { ITopic } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<
    Model<
      { id: string; updatedAt?: string; createdAt?: string } & ITopic,
      ITopic
    >
  >("topics", {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    owner: {
      type: DataTypes.INTEGER(),
    },
    title: {
      type: DataTypes.STRING(),
    },
    content: {
      type: DataTypes.STRING(),
    },
  })
}
