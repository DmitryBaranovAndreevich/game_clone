import { DataTypes, Model, Sequelize } from "sequelize"
import { TComment } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<
    Model<
      { id: string; updatedAt?: string; createdAt?: string } & TComment,
      TComment
    >
  >("comments", {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    owner: {
      type: DataTypes.INTEGER(),
    },
    parentTopic: {
      type: DataTypes.INTEGER(),
    },
    content: {
      type: DataTypes.STRING(),
    },
  })
}
