import { FC, useEffect, useState } from "react"
import {
  App,
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  GetProp,
  Input,
  Layout,
  Modal,
  Row,
  Upload,
  UploadProps,
} from "antd"
import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons"
import { CrazyCrackerIcon } from "../../assets/images/image/image-black-bg"
import styles from "../register/register.module.css"
import { getCookie, setCookie } from "../../utils"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import {
  TUpdatePasswordRequest,
  TUpdateProfileRequest,
  TUser,
  UserApi,
} from "../../services/api/user-api"
import { AuthApi } from "../../services/api/auth-api"
import { BASE_URL } from "../../constants"
import Sidebar from "../../components/sidebar"

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  padding: "50px 0",
  overflow: "hidden",
}

const isNotEmpty = (value: string) => value.trim().length > 0

const Profile: FC = () => {
  const { notification } = App.useApp()
  const navigateTo = useNavigate()
  const location = useLocation()
  const isLogin = getCookie("login")
  const userApi = new UserApi()

  const [user, setUser] = useState<TUser | null>(null)
  const [updateProfileForm] = Form.useForm<TUpdateProfileRequest>()
  const [updatePasswordForm] = Form.useForm<TUpdatePasswordRequest>()

  useEffect(() => {
    if (!isLogin) {
      navigateTo(generatePath("/login"), {
        state: { from: location },
      })
    } else {
      try {
        userApi.getUser().then(response => {
          const userData = response as TUser
          if (userData) {
            setUser(userData)
          }
        })
      } catch (e) {
        if (e instanceof Error) {
          notification.error({ message: e.message, placement: "bottomRight" })
        }
      }
    }
  }, [isLogin])

  updateProfileForm.setFieldsValue({
    first_name: user?.first_name || "",
    second_name: user?.second_name || "",
    display_name: user?.display_name || "",
    login: user?.login || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  updatePasswordForm.setFieldsValue({
    oldPassword: "",
    newPassword: "",
  })

  const updateProfileHandler = (values: TUpdateProfileRequest) => {
    if (Object.values(values).every(isNotEmpty)) {
      try {
        userApi.updateProfile(values).then(() => {
          userApi.getUser().then(response => {
            const userData = response as TUser
            if (userData) {
              setUser(userData)
            }
          })
        })
      } catch (e) {
        if (e instanceof Error) {
          notification.error({ message: e.message, placement: "bottomRight" })
        }
      }
    }
  }
  const updateProfileCancelHandler = () => {
    updateProfileForm.setFieldsValue({
      first_name: user?.first_name || "",
      second_name: user?.second_name || "",
      display_name: user?.display_name || "",
      login: user?.login || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
  }

  const updatePasswordHandler = (values: TUpdatePasswordRequest) => {
    if (Object.values(values).every(isNotEmpty)) {
      try {
        userApi.updatePassword(values).then(() => {
          setIsPasswordModalOpen(false)
        })
      } catch (e) {
        if (e instanceof Error) {
          notification.error({ message: e.message, placement: "bottomRight" })
        }
      }
    }
  }

  const updatePasswordCancelHandler = () => {
    updatePasswordForm.setFieldsValue({
      oldPassword: "",
      newPassword: "",
    })
    setIsPasswordModalOpen(false)
  }

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const uploadAvatarHandler: UploadProps["onChange"] = info => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)

        userApi.getUser().then(response => {
          const userData = response as TUser
          if (userData) {
            setUser(userData)
          }
        })
      })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const logoutHandler = () => {
    try {
      new AuthApi().logout().then(response => {
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
    <>
      <Layout>
        <Layout.Content style={layoutStyle} id="profile">
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
                    style={{ margin: "0" }}
                    rules={[{ pattern: /[A-ZА-ЯЁ]{1}[a-zа-яё-]/, message: "" }]}
                    label={"Name"}
                    key={"first_name"}
                    name={"first_name"}>
                    <Input
                      disabled
                      size="large"
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ margin: "0" }}
                    rules={[{ pattern: /[A-ZА-ЯЁ]{1}[a-zа-яё-]/, message: "" }]}
                    label={"Lastname"}
                    key={"second_name"}
                    name={"second_name"}>
                    <Input
                      disabled
                      size="large"
                      type="text"
                      placeholder="Lastname"
                    />
                  </Form.Item>
                  <Form.Item
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
                    style={{ margin: "0" }}
                    rules={[
                      {
                        pattern: /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/,
                        message: "",
                      },
                    ]}
                    label={"Login"}
                    key={"login"}
                    name={"login"}>
                    <Input
                      disabled
                      size="large"
                      type="text"
                      placeholder="Login"
                    />
                  </Form.Item>
                  <Form.Item
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
                    <Input
                      disabled
                      size="large"
                      type="text"
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ margin: "0" }}
                    rules={[{ pattern: /[+]{0,1}[0-9]{10,15}/, message: "" }]}
                    label={"Phone"}
                    key={"phone"}
                    name={"phone"}>
                    <Input
                      disabled
                      size="large"
                      type="text"
                      placeholder="Phone"
                    />
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
                    src={
                      user?.avatar ? `${BASE_URL}/resources${user.avatar}` : ""
                    }
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
        </Layout.Content>
        <Sidebar />
      </Layout>
      <Modal
        centered
        title="Upload avatar"
        open={isAvatarModalOpen}
        onOk={() => {
          setIsAvatarModalOpen(false)
        }}
        onCancel={() => {
          setIsAvatarModalOpen(false)
        }}
        closeIcon={null}
        width="300px">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          method="put"
          withCredentials
          action="https://ya-praktikum.tech/api/v2/user/profile/avatar"
          onChange={uploadAvatarHandler}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: "100%", borderRadius: "50%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
      <Modal
        centered
        title="Change password"
        footer={null}
        open={isPasswordModalOpen}
        closeIcon={null}
        width="350px">
        <Form
          name="updatePasswordForm"
          form={updatePasswordForm}
          layout={"vertical"}
          onFinish={updatePasswordHandler}>
          <Flex
            vertical
            style={{ maxWidth: "350px", width: "100%" }}
            gap="small">
            <Form.Item
              rules={[
                {
                  pattern: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,40}/,
                  message: "",
                },
              ]}
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
              rules={[
                {
                  pattern: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,40}/,
                  message: "",
                },
              ]}
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
            <Button
              size="large"
              htmlType="button"
              onClick={updatePasswordCancelHandler}
              style={{ maxWidth: "350px", width: "100%" }}>
              Cancel
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default Profile
