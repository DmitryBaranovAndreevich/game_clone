import { Sequelize } from "sequelize"
import { sequelizeOptions } from "./sequelize-constants"
import getUser from "../models/user"
import getTopic from "../models/topic"
import getComment from "../models/comment"
import getAnswer from "../models/answer"
import getReaction from "../models/reaction"

const sequelize = new Sequelize(sequelizeOptions)
export const User = getUser(sequelize)
export const Topic = getTopic(sequelize)
export const Comment = getComment(sequelize)
export const Answer = getAnswer(sequelize)
export const Reaction = getReaction(sequelize)

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

Comment.hasMany(Reaction, {
  foreignKey: "commentId",
  sourceKey: "id",
  as: "commentReactions",
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

Answer.hasMany(Reaction, {
  foreignKey: "answerId",
  sourceKey: "id",
  as: "answerReactions",
})

Reaction.belongsTo(User, {
  foreignKey: "owner",
  targetKey: "id",
})

Reaction.belongsTo(Topic, {
  foreignKey: "topicId",
  targetKey: "id",
})

Reaction.belongsTo(Comment, {
  foreignKey: "commentId",
  targetKey: "id",
  as: "commentReactions",
})

Reaction.belongsTo(Answer, {
  foreignKey: "answerId",
  targetKey: "id",
  as: "answerReactions",
})

export default sequelize
