import { Avatar, Card, Typography } from "antd"
import styles from "./topic-message.module.css"

interface Message {
  name: string
  type: string
  content: string
}

const TopicMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <Card className={`${styles[message.type]}`}>
      <Avatar size={40} className={styles.avatar}>
        {message.name[0]}
      </Avatar>
      <Typography.Text>{message.name}</Typography.Text>
      <p>{message.content}</p>
    </Card>
  )
}

export default TopicMessage
