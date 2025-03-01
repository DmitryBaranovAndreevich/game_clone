import { FC } from "react"
import { generatePath, useNavigate } from "react-router-dom"
import { App, Avatar, Button, Col, Flex, Form, Input, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { TUpdateProfileRequest, UserApi } from "../../../services/api/user-api"
import { AuthApi } from "../../../services/api/auth-api"
import { CrazyCrackerIcon } from "../../../assets/images/image/image-black-bg"
import { BASE_URL } from "../../../constants"
import { getFormRules } from "../../../components"
import styles from "../../register/register.module.css"
import { setInitState, setUserInfo } from "../../../store/slices/user"
import { useAppDispatch, useAppSelector } from "../../../store"

type TComponentProps = {
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const userApi = new UserApi()
const authApi = new AuthApi()

const UpdateProfileForm: FC<TComponentProps> = ({
  setIsAvatarModalOpen,
  setIsPasswordModalOpen,
}) => {
  const {
    userNameFormRules,
    requiredFieldRule,
    userLoginFormRules,
    emailFormRule,
    phoneFormRule,
  } = getFormRules()
  const { info: userInfo } = useAppSelector(state => state.user)
  const { notification } = App.useApp()
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const [updateProfileForm] = Form.useForm<TUpdateProfileRequest>()

  const updateProfileHandler = async (values: TUpdateProfileRequest) => {
    try {
      const response = await userApi.updateProfile(values)
      if (response) {
        dispatch(setUserInfo(response))
      }
    } catch (e) {
      if (e instanceof Error) {
        notification.error({ message: e.message, placement: "bottomRight" })
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
          dispatch(setInitState())
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
      initialValues={{
        first_name: userInfo?.first_name || "",
        second_name: userInfo?.second_name || "",
        display_name: userInfo?.display_name || "",
        login: userInfo?.login || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
      }}
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
            gap="middle"
            style={{ maxWidth: "350px", width: "100%" }}>
            <Form.Item
              style={{ margin: "0" }}
              rules={[userNameFormRules, requiredFieldRule]}
              label={"Name"}
              key={"first_name"}
              name={"first_name"}>
              <Input size="large" type="text" placeholder="Name" />
            </Form.Item>
            <Form.Item
              style={{ margin: "0" }}
              rules={[userNameFormRules, requiredFieldRule]}
              label={"Lastname"}
              key={"second_name"}
              name={"second_name"}>
              <Input size="large" type="text" placeholder="Lastname" />
            </Form.Item>
            <Form.Item
              style={{ margin: "0" }}
              rules={[userNameFormRules, requiredFieldRule]}
              label={"Display name"}
              key={"display_name"}
              name={"display_name"}>
              <Input size="large" type="text" placeholder="Display name" />
            </Form.Item>
            <Form.Item
              style={{ margin: "0" }}
              rules={[requiredFieldRule, userLoginFormRules]}
              label={"Login"}
              key={"login"}
              name={"login"}>
              <Input size="large" type="text" placeholder="Login" />
            </Form.Item>
            <Form.Item
              style={{ margin: "0" }}
              rules={[requiredFieldRule, emailFormRule]}
              label={"Email"}
              key={"email"}
              name={"email"}>
              <Input size="large" type="text" placeholder="Email" />
            </Form.Item>
            <Form.Item
              style={{ margin: "0" }}
              rules={[phoneFormRule, requiredFieldRule]}
              label={"Phone"}
              key={"phone"}
              name={"phone"}>
              <Input size="large" type="text" placeholder="Phone" />
            </Form.Item>
            <Button
              size="large"
              type={"primary"}
              htmlType="submit"
              style={{ maxWidth: "350px", width: "100%" }}>
              Save
            </Button>
            <Button
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
            gap="middle"
            style={{
              maxWidth: "350px",
              width: "100%",
              paddingRight: "80px",
            }}>
            <Avatar
              size={150}
              icon={<UserOutlined />}
              style={{ border: "1px solid #fff", cursor: "pointer" }}
              onClick={() => {
                setIsAvatarModalOpen(true)
              }}
              src={
                userInfo?.avatar
                  ? `${BASE_URL}/resources${userInfo.avatar}`
                  : null
              }
            />
            <Button
              htmlType="button"
              onClick={() => {
                setIsPasswordModalOpen(true)
              }}
              style={{ maxWidth: "350px", width: "100%" }}>
              Change password
            </Button>
            <Button
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
