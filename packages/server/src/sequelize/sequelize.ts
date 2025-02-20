import { Sequelize } from "sequelize"
import { sequelizeOptions } from "./sequelize-constants"
import getUser from "../models/user"
import getTopic from "../models/topic"
import getComment from "../models/comment"

const sequelize = new Sequelize(sequelizeOptions)
export const User = getUser(sequelize)
export const Topic = getTopic(sequelize)
export const Comment = getComment(sequelize)

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

export default sequelize
