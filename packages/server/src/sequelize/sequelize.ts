import { Sequelize } from "sequelize"
import { sequelizeOptions } from "./sequelize-constants"
import getUser from "../models/user"
import getTopic from "../models/topic"
import getComment from "../models/comment"
import getAnswer from "../models/answer"

const sequelize = new Sequelize(sequelizeOptions)
export const User = getUser(sequelize)
export const Topic = getTopic(sequelize)
export const Comment = getComment(sequelize)
export const Answer = getAnswer(sequelize)

Topic.belongsTo(User, {
  foreignKey: "owner",
  targetKey: "id",
})

Comment.belongsTo(User, {
  foreignKey: "owner",
  targetKey: "id",
})

Comment.belongsTo(Topic, {
  foreignKey: "parentTopic",
  targetKey: "id",
})

Answer.belongsTo(User, {
  foreignKey: "owner",
  targetKey: "id",
})

Answer.belongsTo(Topic, {
  foreignKey: "parentTopic",
  targetKey: "id",
})

Answer.belongsTo(Comment, {
  foreignKey: "parentComment",
  targetKey: "id",
})

export default sequelize
