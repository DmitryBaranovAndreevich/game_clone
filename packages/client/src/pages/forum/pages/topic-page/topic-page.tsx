import { Typography, Flex, Button, Input } from "antd"
import PostMessage from "../../components/topic-message"
import styles from "./topic-page.module.css"
import { withAuth } from "../../../../components"

let messages = [
  {
    name: "Name",
    type: "post",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vestibulum semper elit non dignissim commodo. 
      Morbi porttitor velit justo, ac pharetra ipsum dignissim et. 
      Nunc eu purus ut massa aliquet pretium quis egestas lectus. 
      Duis luctus nibh in libero tempus, vitae tempor libero ullamcorper. 
      Cras porttitor quam in tristique tincidunt. 
      Etiam nec tortor non elit hendrerit porttitor. 
      Pellentesque ac laoreet tortor.`,
  },
  {
    name: "Name",
    type: "comment",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vestibulum semper elit non dignissim commodo.`,
  },
  {
    name: "Name",
    type: "comment",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vestibulum semper elit non dignissim commodo.
      Duis luctus nibh in libero tempus, vitae tempor libero ullamcorper. 
      Cras porttitor quam in tristique tincidunt. 
      Etiam nec tortor non elit hendrerit porttitor. 
      Pellentesque ac laoreet tortor`,
  },
]

const TopicPage = () => {
  const handleAddMessage = () => {
    const newMessage = {
      name: "New User",
      type: "comment",
      content: "This is a new comment added to the list!",
    }
    messages = [...messages, newMessage]
  }

  return (
    <Flex vertical align={"center"} gap={24}>
      <Typography.Title level={5}>VERY IMPORTANR POST</Typography.Title>
      <Flex
        vertical
        align={"center"}
        gap={24}
        className={styles.scrollContainer}>
        {messages.map((message, index) => (
          <PostMessage key={index} message={message} />
        ))}
      </Flex>
      <Flex className={styles.bottomActions}>
        <Input.TextArea rows={1} />
        <Button onClick={handleAddMessage}>Add comment</Button>
      </Flex>
    </Flex>
  )
}

export default withAuth(TopicPage)
