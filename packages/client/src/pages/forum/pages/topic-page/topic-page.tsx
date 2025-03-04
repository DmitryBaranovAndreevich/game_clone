import { Typography, Flex, Button, Input, Card } from "antd"
import PostMessage from "../../components/topic-message"
import styles from "./topic-page.module.css"
import { withAuth } from "../../../../components"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { TMessage, topicApiInstance } from "../../forum-api"

const TopicPage = () => {
  const { topicId } = useParams()
  const location = useLocation()
  const { topicData } = location.state || {}
  const [text, setText] = useState<string>()
  const [messages, setMessages] = useState<TMessage[]>([])

  useEffect(() => {
    if (!topicId) {
      return
    }
    topicApiInstance
      .getAllComments(topicId)
      .then(res => {
        setMessages(res)
      })
      .catch(e => console.log(e))
  }, [topicId])

  const handleAddMessage = () => {
    if (!topicId || !text) {
      return
    }
    topicApiInstance
      .createComments({ topic: topicId, content: text })
      .then(() => {
        setText("")
        return topicApiInstance.getAllComments(topicId)
      })
      .then(res => {
        setMessages(res)
      })
      .catch(e => console.log(e))
  }

  return (
    <Flex vertical align={"center"} gap={24}>
      <Typography.Title level={5}>{topicData.title}</Typography.Title>
      <Flex
        vertical
        align={"center"}
        gap={24}
        className={styles.scrollContainer}>
        {/* Topic */}
        <Card className={styles.topic}> {topicData.content}</Card>
        {/* all kinds of responses: answers, comments*/}
        {messages.map((message, index) => (
          <PostMessage
            key={index}
            message={message}
            setMessages={setMessages}
            messageId={message.id}
          />
        ))}
      </Flex>
      <Flex className={styles.bottomActions}>
        <Input.TextArea
          rows={1}
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <Button onClick={handleAddMessage}>Add comment</Button>
      </Flex>
    </Flex>
  )
}

export default withAuth(TopicPage)
