import { Card, Typography, Flex } from "antd"
import styles from "./topic.module.css"

interface Topic {
  theme: string
  replies: number
}

const Topic: React.FC<{ topic: Topic }> = ({ topic }) => {
  return (
    <Card className={styles.topic}>
      <Flex justify="space-between">
        <Typography.Title level={5} className={styles.topicContent}>
          {topic.theme}
        </Typography.Title>
        <span className={styles.topicContent}>{topic.replies}</span>
      </Flex>
    </Card>
  )
}

export default Topic
