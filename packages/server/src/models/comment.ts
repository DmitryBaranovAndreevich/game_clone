import { DataTypes, Sequelize } from "sequelize"
import { CommentInstance } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<CommentInstance>("comments", {
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
