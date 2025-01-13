import { Button, Flex, Form, Input, Modal, notification } from "antd"
import { FC } from "react"
import { TUpdatePasswordRequest, UserApi } from "../../../services/api/user-api"

const isNotEmpty = (value: string) => value.trim().length > 0

type TComponentProps = {
  isPasswordModalOpen: boolean
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const userApi = new UserApi()

const UpdatePasswordModal: FC<TComponentProps> = ({
  isPasswordModalOpen,
  setIsPasswordModalOpen,
}) => {
  const [updatePasswordForm] = Form.useForm<TUpdatePasswordRequest>()

  const updatePasswordHandler = async (values: TUpdatePasswordRequest) => {
    if (Object.values(values).every(isNotEmpty)) {
      try {
        const response = await userApi.updatePassword(values)
        if (response) {
          updatePasswordForm.resetFields(["oldPassword", "newPassword"])
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
    <Modal
      centered
      title="Change password"
      onOk={() => {
        setIsPasswordModalOpen(false)
        updatePasswordForm.resetFields(["oldPassword", "newPassword"])
      }}
      onCancel={() => {
        setIsPasswordModalOpen(false)
        updatePasswordForm.resetFields(["oldPassword", "newPassword"])
      }}
      open={isPasswordModalOpen}
      closeIcon={null}
      width="350px">
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
            initialValue={""}
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
            initialValue={""}
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
    </Modal>
  )
}

export default UpdatePasswordModal
