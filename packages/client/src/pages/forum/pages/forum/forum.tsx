import { Typography, Flex, List, Button, Layout } from "antd"
import styles from "./forum.module.css"
import Topic from "../../components/topic"
import { Link } from "react-router-dom"
import Sidebar from "../../../../components/sidebar"
import { withAuth } from "../../../../components"

const topics = [
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
    <Layout>
      <Layout.Content>
        <Flex vertical align={"center"} gap={24} className={styles.forumPage}>
          <Typography.Title level={3}>Forum</Typography.Title>

          <Flex className={styles.headers} justify="space-between">
            <span>Topic</span>
            <span>Replies</span>
          </Flex>

          <List
            grid={{ gutter: 16, column: 1 }}
            className={styles.list}
            dataSource={topics}
            renderItem={topic => (
              <List.Item>
                <Link to="/forum/:TopicId">
                  <Topic topic={topic} />
                </Link>
              </List.Item>
            )}
          />

          <Flex className={styles.headers}>
            <Link to="/create-topic">
              <Button>Add topic</Button>
            </Link>
          </Flex>
        </Flex>
      </Layout.Content>
      <Sidebar />
    </Layout>
  )
}

export default withAuth(Forum)
