import { Typography, Flex, List } from "antd"
import styles from "./forum.module.css"
import TopicItem from "./components/topic-item"

const items = [
  { theme: "Theme 1", replies: 222 },
  { theme: "Theme 2", replies: 233 },
  { theme: "Theme 3", replies: 344 },
  { theme: "Theme 4", replies: 455 },
  { theme: "Theme 5", replies: 566 },
  { theme: "Theme 6", replies: 666 },
  { theme: "Theme 7", replies: 788 },
]

const Forum = () => {
  return (
    <Flex vertical align={"center"} gap={24} className={styles.scorePage}>
      <Typography.Title level={3}>Forum</Typography.Title>

      <Flex className={styles.headers} justify="space-between">
        <span>Topic</span>
        <span>Replies</span>
      </Flex>

      <List
        grid={{ gutter: 16, column: 1 }}
        className={styles.list}
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <TopicItem item={item} />
          </List.Item>
        )}
      />
      <Flex className={styles.headers}>Add topic</Flex>
    </Flex>
  )
}

export default Forum
