import { Form, Input, Button, Typography, Flex } from "antd"
import { getFormRules } from "../../../../components/form-rules"

const CreateTopic = () => {
  const { requiredFieldRule } = getFormRules()
  return (
    <Flex vertical align={"center"} gap={24}>
      <Typography.Title level={3}>New Topic</Typography.Title>

      <Form style={{ width: "60%" }} layout="vertical">
        <Form.Item label="Title" name="title" rules={[requiredFieldRule]}>
          <Input />
        </Form.Item>

        <Form.Item label="Content" name="content" rules={[requiredFieldRule]}>
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
