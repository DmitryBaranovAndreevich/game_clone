import { FC, useState } from "react"
import {
  Avatar,
  Button,
  Flex,
  Form,
  GetProp,
  Input,
  Layout,
  Modal,
  Upload,
  UploadProps,
} from "antd"
import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons"

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  // backgroundColor: "#000",
  // backgroundImage: "url(src/assets/images/image/image.png)",
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "contain",
  // backgroundPosition: "bottom -230px left -300px",
}

type FormData = {
  name: string
  lastname: string
  nickname: string
  email: string
  phone: string
  password: string
}

const Profile: FC = () => {
  // const [fields, setFields] = useState<FormData>({
  //   name: "Name",
  //   lastname: "Lastname",
  //   nickname: "Nickname",
  //   email: "Email",
  //   phone: "Phone",
  //   password: "Password"
  // });

  const [form] = Form.useForm<FormData>()
  form.setFieldsValue({
    name: "Name",
    lastname: "Lastname",
    nickname: "Nickname",
    email: "Email",
    phone: "Phone",
    password: "Password",
  })

  const onFinish = (values: FormData) => {
    console.log(values)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const handleChange: UploadProps["onChange"] = info => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <>
      <Layout>
        <Layout.Content style={layoutStyle} id="leaderboard">
          <Flex
            vertical
            justify="center"
            align="center"
            style={{ height: "100%" }}>
            <Form
              name="profile"
              form={form}
              layout={"vertical"}
              style={{ width: "100%" }}
              onFinish={onFinish}>
              <Flex gap={100} justify="center" align="center">
                <Flex vertical style={{ maxWidth: "350px", width: "100%" }}>
                  <Form.Item label={"Name"} name={"name"}>
                    <Input size="large" placeholder="Name" />
                  </Form.Item>
                  <Form.Item label={"Lastname"} name={"lastname"}>
                    <Input size="large" placeholder="Lastname" />
                  </Form.Item>
                  <Form.Item label={"Nickname"} name={"nickname"}>
                    <Input size="large" placeholder="Nickname" />
                  </Form.Item>
                  <Form.Item label={"Email"} name={"email"}>
                    <Input size="large" placeholder="Email" />
                  </Form.Item>
                  <Form.Item label={"Phone"} name={"phone"}>
                    <Input size="large" placeholder="Phone" />
                  </Form.Item>
                  <Form.Item label={"Password"} name={"password"}>
                    <Input size="large" placeholder="Password" />
                  </Form.Item>
                </Flex>
                <Flex
                  vertical
                  align="center"
                  style={{ maxWidth: "350px", width: "100%" }}
                  gap="large">
                  <Avatar
                    size={150}
                    icon={<UserOutlined />}
                    style={{ border: "1px solid #fff" }}
                    onClick={showModal}
                  />
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
                    onClick={() => {
                      console.log("Cancel")
                    }}
                    style={{ maxWidth: "350px", width: "100%" }}>
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    htmlType="button"
                    onClick={() => {
                      console.log("Log out")
                    }}
                    style={{ maxWidth: "350px", width: "100%" }}>
                    Log out
                  </Button>
                </Flex>
              </Flex>
            </Form>
          </Flex>
        </Layout.Content>
      </Layout>
      <Modal
        centered
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          onChange={handleChange}>
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Modal>
    </>
  )
}

export default Profile