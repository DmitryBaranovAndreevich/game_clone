import { FC, useEffect } from "react"
import { generatePath, useNavigate } from "react-router-dom"
import { App, Avatar, Button, Col, Flex, Form, Input, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"
import {
  TUpdateProfileRequest,
  TUser,
  UserApi,
} from "../../../services/api/user-api"
import { AuthApi } from "../../../services/api/auth-api"
import { setCookie } from "../../../utils"
import { CrazyCrackerIcon } from "../../../assets/images/image/image-black-bg"
import { BASE_URL } from "../../../constants"
import styles from "../../register/register.module.css"

const isNotEmpty = (value: string) => value.trim().length > 0

type TComponentProps = {
  user: TUser | null
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const userApi = new UserApi()
const authApi = new AuthApi()

const UpdateProfileForm: FC<TComponentProps> = ({
  user,
  setUser,
  setIsAvatarModalOpen,
  setIsPasswordModalOpen,
}) => {
  const { notification } = App.useApp()
  const navigateTo = useNavigate()
  const [updateProfileForm] = Form.useForm<TUpdateProfileRequest>()

  useEffect(() => {
    updateProfileForm.setFieldsValue({
      first_name: user?.first_name || "",
      second_name: user?.second_name || "",
      display_name: user?.display_name || "",
      login: user?.login || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
  }, [user])

  const updateProfileHandler = async (values: TUpdateProfileRequest) => {
    if (Object.values(values).every(isNotEmpty)) {
      try {
        const response = await userApi.updateProfile(values)
        if (response) {
          setUser(response as TUser)
        }
      } catch (e) {
        if (e instanceof Error) {
          notification.error({ message: e.message, placement: "bottomRight" })
        }
      }
    }
  }
  const updateProfileCancelHandler = () => {
    updateProfileForm.resetFields([
      "first_name",
      "second_name",
      "display_name",
      "login",
      "email",
      "phone",
    ])
  }

  const logoutHandler = () => {
    try {
      authApi.logout().then(response => {
        if (response) {
          setCookie("login", "true", { expires: -1 })
          navigateTo(generatePath("/"))
        }
      })
    } catch (e) {
      if (e instanceof Error) {
        notification.error({ message: e.message, placement: "bottomRight" })
      }
    }
  }

  return (
    <Form
      name="updateProfileForm"
      form={updateProfileForm}
      layout={"vertical"}
      onFinish={updateProfileHandler}>
      <Row
        align={"middle"}
        justify={"center"}
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          padding: "10px",
        }}
        gutter={{ xs: 10, sm: 10, md: 30, lg: 60 }}>
        <Col className={styles.iconContainer} xs={0} sm={0} md={6} lg={6}>
          <CrazyCrackerIcon className={styles.icon} />
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <Flex
            vertical
            style={{ maxWidth: "350px", width: "100%" }}
            gap="large">
            <Form.Item
              initialValue={user?.first_name || ""}
              style={{ margin: "0" }}
              rules={[{ pattern: /[A-ZА-ЯЁ]{1}[a-zа-яё-]/, message: "" }]}
              label={"Name"}
              key={"first_name"}
              name={"first_name"}>
              <Input disabled size="large" type="text" placeholder="Name" />
            </Form.Item>
            <Form.Item
              initialValue={user?.second_name || ""}
              style={{ margin: "0" }}
              rules={[{ pattern: /[A-ZА-ЯЁ]{1}[a-zа-яё-]/, message: "" }]}
              label={"Lastname"}
              key={"second_name"}
              name={"second_name"}>
              <Input disabled size="large" type="text" placeholder="Lastname" />
            </Form.Item>
            <Form.Item
              initialValue={user?.display_name || ""}
              style={{ margin: "0" }}
              rules={[{ pattern: /[A-ZА-ЯЁ]{1}[a-zа-яё-]/, message: "" }]}
              label={"Display name"}
              key={"display_name"}
              name={"display_name"}>
              <Input
                disabled
                size="large"
                type="text"
                placeholder="Display name"
              />
            </Form.Item>
            <Form.Item
              initialValue={user?.login || ""}
              style={{ margin: "0" }}
              rules={[
                { pattern: /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/, message: "" },
              ]}
              label={"Login"}
              key={"login"}
              name={"login"}>
              <Input disabled size="large" type="text" placeholder="Login" />
            </Form.Item>
            <Form.Item
              initialValue={user?.email || ""}
              style={{ margin: "0" }}
              rules={[
                {
                  pattern:
                    /[a-zA-Z0-9_-]{1,}@{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}/,
                  message: "",
                },
              ]}
              label={"Email"}
              key={"email"}
              name={"email"}>
              <Input disabled size="large" type="text" placeholder="Email" />
            </Form.Item>
            <Form.Item
              initialValue={user?.phone || ""}
              style={{ margin: "0" }}
              rules={[{ pattern: /[+]{0,1}[0-9]{10,15}/, message: "" }]}
              label={"Phone"}
              key={"phone"}
              name={"phone"}>
              <Input disabled size="large" type="text" placeholder="Phone" />
            </Form.Item>
            <Button
              disabled
              size="large"
              type={"primary"}
              htmlType="submit"
              style={{ maxWidth: "350px", width: "100%" }}>
              Save
            </Button>
            <Button
              disabled
              size="large"
              htmlType="button"
              onClick={updateProfileCancelHandler}
              style={{ maxWidth: "350px", width: "100%" }}>
              Cancel
            </Button>
          </Flex>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <Flex
            vertical
            align="center"
            style={{
              maxWidth: "350px",
              width: "100%",
              paddingRight: "80px",
            }}
            gap="large">
            <Avatar
              size={150}
              icon={<UserOutlined />}
              style={{ border: "1px solid #fff", cursor: "pointer" }}
              onClick={() => {
                setIsAvatarModalOpen(true)
              }}
              src={user?.avatar ? `${BASE_URL}/resources${user.avatar}` : null}
            />
            <Button
              size="large"
              htmlType="button"
              onClick={() => {
                setIsPasswordModalOpen(true)
              }}
              style={{ maxWidth: "350px", width: "100%" }}>
              Change password
            </Button>
            <Button
              size="large"
              htmlType="button"
              onClick={logoutHandler}
              style={{ maxWidth: "350px", width: "100%" }}>
              Log out
            </Button>
          </Flex>
        </Col>
      </Row>
    </Form>
  )
}

export default UpdateProfileForm
