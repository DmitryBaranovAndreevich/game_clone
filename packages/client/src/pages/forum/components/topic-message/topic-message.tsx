import { Avatar, Card, Typography } from "antd"
import styles from "./topic-message.module.css"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { ReactionIcon } from "../../../../assets/images/icons/reactionIcon"

interface Message {
  name: string
  type: string
  content: string
}

const TopicMessage: React.FC<{ message: Message }> = ({ message }) => {
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
      <Avatar size={40} className={styles.avatar}>
        {message.name[0]}
      </Avatar>
      <Typography.Text>{message.name}</Typography.Text>
      <p>{message.content}</p>

      <span style={{ float: "right" }}>
        {!openEmojiPicker && (
          <span onClick={() => setOpenEmojiPicker(true)}>
            <ReactionIcon width="25px" height="25px" />
          </span>
        )}

        {openEmojiPicker && (
          <div ref={pickerRef}>
            <EmojiPicker
              reactionsDefaultOpen={true}
              allowExpandReactions={false}
              onReactionClick={hendalReaction}
              theme={"dark"}
              skinTonesDisabled={true}
            />
          </div>
        )}
      </span>
    </Card>
  )
}

export default TopicMessage
