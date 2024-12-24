import { FC, useState } from "react"
import { Avatar, Button, Flex, Form, Input, Layout, } from 'antd'
import { UserOutlined } from '@ant-design/icons'


const layoutStyle = {
  height: "100vh",
  width: "100vw",
  // backgroundColor: "#000",
  // backgroundImage: "url(src/assets/images/image/image.png)",
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "contain",
  // backgroundPosition: "bottom -230px left -300px",
};

type FormData = {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
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
  
  const [form] = Form.useForm<FormData>();  
  form.setFieldsValue({ 
    name: "Name",
    lastname: "Lastname",
    nickname: "Nickname",
    email: "Email",
    phone: "Phone",
    password: "Password"
  })

  const onFinish = (values: FormData) => {
    console.log(values);
  };

  return (
    <Layout>
      <Layout.Content style={layoutStyle} id="leaderboard">
        <Flex vertical justify="center" align="center" style={ {height: "100%"} }>
          <Form
            name="profile"
            form={form}
            layout={"vertical"}
            style={{width: "100%"}}
            onFinish={onFinish}
          >
          <Flex gap={100}  justify="center" align="center">
            <Flex vertical style={{maxWidth: "350px", width: "100%"}} >
              <Form.Item label={"Name"} name={"name"}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label={"Lastname"} name={"lastname"}>
                <Input placeholder="Lastname" />
              </Form.Item>
              <Form.Item label={"Nickname"} name={"nickname"}>
                <Input placeholder="Nickname" />
              </Form.Item>
              <Form.Item label={"Email"} name={"email"}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label={"Phone"} name={"phone"}>
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item label={"Password"} name={"password"}>
                <Input placeholder="Password" />
              </Form.Item>
            </Flex>
            <Flex vertical align="center" style={{maxWidth: "350px", width: "100%"}} gap="large">
              <Avatar size={150} icon={<UserOutlined />}  style={{ border: "1px solid #fff"}} />
              <Button 
                type={"primary"}
                htmlType="submit" 
                style={{maxWidth: "350px", width: "100%"}}>
                  Save
              </Button>
              <Button 
                htmlType="button"
                onClick={() => {console.log("Cancel")}}
                style={{maxWidth: "350px", width: "100%"}}>
                  Cancel
              </Button>
              <Button 
                htmlType="button"
                onClick={() => {console.log("Log out")}} 
                style={{maxWidth: "350px", width: "100%"}}>
                  Log out
                </Button>
            </Flex>
          </Flex>
        </Form>
        </Flex>
      </Layout.Content>
    </Layout>
  )
}

export default Profile
