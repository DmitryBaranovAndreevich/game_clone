import { Typography, Flex, List, Button, Layout } from "antd"
import styles from "./forum.module.css"
import Topic from "../../components/topic"
import { Link } from "react-router-dom"
import Sidebar from "../../../../components/sidebar"
import { withAuth } from "../../../../components"
import { useEffect, useState } from "react"
import { topicApiInstance } from "../../forum-api"

const Forum = () => {
  const [topics, setTopics] = useState<
    {
      title: string
      content: string
      replies: number
      id: string
    }[]
  >([])

  useEffect(() => {
    topicApiInstance.getAllTopics().then(res => {
      setTopics(
        res.map(t => ({
          title: t.title,
          content: t.content,
          replies: t.comments,
          id: t.id,
        })),
      )
    })
  }, [])
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
                <Link to={`/forum/${topic.id}`} state={{ topicData: topic }}>
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
