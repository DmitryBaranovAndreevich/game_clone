import { DataTypes, Sequelize } from "sequelize"
import { AnswerInstance } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<AnswerInstance>("answers", {
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
    parentComment: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },
    parentAnswer: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(),
    },
  })
}
