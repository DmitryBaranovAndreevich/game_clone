import { Form, Input, Button, Typography, Flex } from "antd"

const CreateTopic = () => {
  return (
    <Flex vertical align={"center"} gap={24}>
      <Typography.Title level={3}>New Topic</Typography.Title>

      <Form style={{ width: "60%" }} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the post title!" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Please enter the post content!" },
          ]}>
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create post
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default CreateTopic
