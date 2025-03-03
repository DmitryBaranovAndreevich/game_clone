import { Avatar, Button, Card, Flex, Input, Popover, Typography } from "antd"
import styles from "./topic-message.module.css"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { TMessage, topicApiInstance } from "../../forum-api"
import Reaction from "../reaction"
import { BASE_URL } from "../../../../constants"

const TopicMessage: React.FC<{
  message: TMessage
  setMessages: (args: TMessage[]) => void
  messageId: string
}> = ({ message, setMessages, messageId }) => {
  const { topicId } = useParams()

  const [open, setOpen] = useState(false)
  const [text, setText] = useState<string>()
  const handleAddMessage = () => {
    if (!topicId || !text) {
      return
    }
    topicApiInstance
      .createAnswer({
        topic: topicId,
        content: text,
        comment: messageId,
        answer: message.type === "comment" ? null : message.id,
      })
      .then(() => {
        setText("")
        return topicApiInstance.getAllComments(topicId)
      })
      .then(res => {
        setMessages(res)
        setOpen(!open)
      })
      .catch(e => console.log(e))
  }
  return (
    <Card className={`${(styles[message.type], styles.message)}`}>
      <Avatar
        size={40}
        className={styles.avatar}
        src={`${BASE_URL}/resources${message.user.avatar}`}
      />
      <Typography.Text>{message.user.login}</Typography.Text>
      <p>{message.content}</p>
      <Popover
        open={open}
        content={
          <Flex>
            <Input
              style={{ width: "100%" }}
              onChange={e => setText(e.target.value)}
              value={text}
            />
            <Button onClick={handleAddMessage}>Add answer</Button>
          </Flex>
        }
        title="Title"
        trigger="click">
        <Flex gap={"large"}>
          <Reaction message={message} setMessages={setMessages} />
          <Button
            style={{ marginLeft: "auto" }}
            type={"primary"}
            size={"small"}
            ghost
            onClick={() => setOpen(!open)}>
            Add answer
          </Button>
        </Flex>
      </Popover>
      {message.comments &&
        message.comments.map(mes => {
          return (
            <TopicMessage
              message={mes}
              key={mes.id}
              setMessages={setMessages}
              messageId={messageId}
            />
          )
        })}
    </Card>
  )
}

export default TopicMessage
