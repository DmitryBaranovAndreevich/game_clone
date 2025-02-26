import { Button, Card, Flex, Input, Popover, Typography } from "antd"
import { LikeOutlined, LikeFilled } from "@ant-design/icons"
import styles from "./topic-message.module.css"
import { useParams } from "react-router-dom"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { ReactionIcon } from "../../../../assets/images/icons/reactionIcon"
import { TMessage, topicApiInstance } from "../../forum-api"
import { useAppSelector } from "../../../../store"
import { getUserId } from "../../../../store/selectors"

const TopicMessage: React.FC<{
  message: TMessage
  setMessages: (args: TMessage[]) => void
  messageId: string
}> = ({ message, setMessages, messageId }) => {
  const { topicId } = useParams()
  const userId = useAppSelector(getUserId)
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
        answer: message.type === "post" ? null : message.id,
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

  const isLike = userId && message.likes.includes(userId)

  const onAddLike = async () => {
    try {
      if (message.type === "post") {
        await topicApiInstance.addCommentLike(message.id)
      } else {
        await topicApiInstance.addAnswerLike(message.id)
      }

      if (!topicId) {
        return
      }
      const messages = await topicApiInstance.getAllComments(topicId)
      setMessages(messages)
    } catch (e) {
      console.log(e)
    }
  }

  const onDeleteLike = async () => {
    try {
      if (message.type === "post") {
        await topicApiInstance.deleteCommentLike(message.id)
      } else {
        await topicApiInstance.deleteAnswerLike(message.id)
      }

      if (!topicId) {
        return
      }
      const messages = await topicApiInstance.getAllComments(topicId)
      setMessages(messages)
    } catch (e) {
      console.log(e)
    }
  }
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpenEmojiPicker(false)
      }
    }
    if (openEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openEmojiPicker])

  const hendalReaction = () => {
    setOpenEmojiPicker(false)
    console.log("UpdateReaction")
  }

  return (
    <Card className={`${styles[message.type]}`}>
      {/* <Avatar size={40} className={styles.avatar}>
        {message.ow}
      </Avatar> */}
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
            <Button onClick={handleAddMessage}>Add comment</Button>
          </Flex>
        }
        title="Title"
        trigger="click">
        <Flex gap={"large"}>
          <Button
            type={"primary"}
            size={"small"}
            ghost
            onClick={() => setOpen(!open)}>
            Ответить
          </Button>
          {isLike ? (
            <LikeFilled onClick={onDeleteLike} />
          ) : (
            <LikeOutlined onClick={onAddLike} />
          )}

          <EmojiPicker
            reactionsDefaultOpen={true}
            allowExpandReactions={false}
            onReactionClick={hendalReaction}
            theme={"dark"}
            skinTonesDisabled={true}
          />
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
