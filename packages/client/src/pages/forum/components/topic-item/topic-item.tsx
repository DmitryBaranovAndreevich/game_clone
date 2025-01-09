import { Card, Typography } from "antd"
import { Col, Row } from "antd"

interface Item {
  theme: string
  replies: number
}

const TopicItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <Card style={{ width: "100%", padding: 0 }}>
      <Row style={{ width: "100%", padding: 0 }}>
        <Col span={18}>
          <Typography.Title level={5} style={{ margin: 12 }}>
            {item.theme}
          </Typography.Title>
        </Col>
        <Col span={6} style={{ textAlign: "center" }}>
          <Card size="small">{item.replies}</Card>
        </Col>
      </Row>
    </Card>
  )
}

export default TopicItem
