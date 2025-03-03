import { DataTypes, Model, Sequelize } from "sequelize"
import { ReactionRecord } from "../types"

export default (sequelize: Sequelize) => {
  return sequelize.define<
    Model<{ id: string } & ReactionRecord, ReactionRecord>
  >("reaction", {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    owner: {
      type: DataTypes.INTEGER(),
    },
    reaction: {
      type: DataTypes.STRING(),
    },
    topicId: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },
    commentId: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },
    answerId: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },
  })
}
