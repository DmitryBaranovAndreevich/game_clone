import styles from "./reaction.module.css"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { topicApiInstance, TMessage } from "../../forum-api"
import { ReactionIcon } from "../../../../assets/images/icons/reactionIcon"
import { Button } from "antd"

interface Reaction {
  messageId: string
  type: "topic" | "answer" | "comment"
  message: TMessage
}

const Reaction: React.FC<{
  message: TMessage
  setMessages: (args: TMessage[]) => void
}> = ({ message, setMessages }) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const { topicId } = useParams()

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

  const handleReaction = async (emojiObject: { emoji: string }) => {
    const curReaction = message.reactions.find(
      r => r.emoji === emojiObject.emoji,
    )
    if (curReaction && curReaction.isUserReacted) {
      await deleteReaction(emojiObject.emoji)
    } else {
      await addReaction(emojiObject.emoji)
    }
    setOpenEmojiPicker(false)
  }

  const addReaction = async (emoji: string) => {
    try {
      await topicApiInstance.addReaction({
        emoji: emoji,
        type: message.type,
        typeId: parseInt(message.id),
      })
      if (!topicId) {
        return
      }
      const res = await topicApiInstance.getAllComments(topicId)
      setMessages(res)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteReaction = async (emoji: string) => {
    try {
      await topicApiInstance.deleteReaction({
        emoji: emoji,
        type: message.type,
        typeId: parseInt(message.id),
      })
      if (!topicId) {
        return
      }
      const res = await topicApiInstance.getAllComments(topicId)
      setMessages(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {message.reactions.map((reaction, index) =>
        reaction.isUserReacted ? (
          <Button
            className={styles.activeReation}
            key={index}
            onClick={() => deleteReaction(reaction.emoji)}>
            {reaction.emoji} {reaction.amount}
          </Button>
        ) : (
          <Button
            key={index}
            type="text"
            onClick={() => addReaction(reaction.emoji)}>
            {reaction.emoji} {reaction.amount}
          </Button>
        ),
      )}
      <span onClick={() => setOpenEmojiPicker(true)}>
        <ReactionIcon width="25px" height="25px" />
      </span>
      {openEmojiPicker && (
        <div ref={pickerRef} className={styles.emojiPicker}>
          <EmojiPicker
            reactionsDefaultOpen={true}
            allowExpandReactions={false}
            onReactionClick={handleReaction}
            theme={Theme.DARK}
            skinTonesDisabled={true}
          />
        </div>
      )}
    </>
  )
}

export default Reaction
