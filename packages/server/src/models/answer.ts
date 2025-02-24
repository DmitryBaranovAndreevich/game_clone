import { DataTypes, Model, Sequelize } from "sequelize"
import { TAnswer } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<
    Model<
      { id: string; updatedAt?: string; createdAt?: string } & TAnswer,
      TAnswer
    >
  >("answers", {
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
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
  })
}
