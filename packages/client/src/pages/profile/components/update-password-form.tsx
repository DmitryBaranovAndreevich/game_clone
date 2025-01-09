import { Button, Flex, Form, Input, notification } from "antd"
import { FC, useEffect } from "react"
import { TUpdatePasswordRequest, UserApi } from "../../../services/api/user-api"

const isNotEmpty = (value: string) => value.trim().length > 0

type TComponentProps = {
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdatePasswordForm: FC<TComponentProps> = ({
  setIsPasswordModalOpen,
}) => {
  const userApi = new UserApi()
  const [updatePasswordForm] = Form.useForm<TUpdatePasswordRequest>()

  useEffect(() => {
    updatePasswordForm.setFieldsValue({
      oldPassword: "",
      newPassword: "",
    })
  }, [])

  const updatePasswordHandler = async (values: TUpdatePasswordRequest) => {
    if (Object.values(values).every(isNotEmpty)) {
      try {
        const response = await userApi.updatePassword(values)
        if (response) {
          updatePasswordForm.setFieldsValue({
            oldPassword: "",
            newPassword: "",
          })
          setIsPasswordModalOpen(false)
        }
      } catch (e) {
        if (e instanceof Error) {
          notification.error({ message: e.message, placement: "bottomRight" })
        }
      }
    }
  }

  return (
    <Form
      name="updatePasswordForm"
      form={updatePasswordForm}
      layout={"vertical"}
      onFinish={updatePasswordHandler}>
      <Flex vertical style={{ maxWidth: "350px", width: "100%" }} gap="small">
        <Form.Item
          //   rules={[
          //     {
          //       pattern: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,40}/,
          //       message: "",
          //     },
          //   ]}
          style={{ margin: "0" }}
          label={"Old password"}
          key={"oldPassword"}
          name={"oldPassword"}>
          <Input.Password
            size="large"
            type="password"
            placeholder="Old password"
          />
        </Form.Item>
        <Form.Item
          //   rules={[
          //     {
          //       pattern: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,40}/,
          //       message: "",
          //     },
          //   ]}
          style={{ margin: "0" }}
          label={"New password"}
          key={"newPassword"}
          name={"newPassword"}>
          <Input.Password
            size="large"
            type="password"
            placeholder="New password"
          />
        </Form.Item>
        <Button
          size="large"
          type={"primary"}
          htmlType="submit"
          style={{ maxWidth: "350px", width: "100%" }}>
          Save
        </Button>
      </Flex>
    </Form>
  )
}

export default UpdatePasswordForm
