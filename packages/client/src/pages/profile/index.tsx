import { FC, useEffect, useState } from "react"
import { Flex, Layout, Modal } from "antd"
import { getCookie } from "../../utils"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { TUser, UserApi } from "../../services/api/user-api"
import Sidebar from "../../components/sidebar"
import UpdatePasswordForm from "./components/update-password-form"
import UploadAvatar from "./components/upload-avatar"
import UpdateProfileForm from "./components/update-profile-form"

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  padding: "50px 0",
  overflow: "hidden",
}

const Profile: FC = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
  const userApi = new UserApi()
  const isLogin = getCookie("login")

  const [user, setUser] = useState<TUser | null>(null)

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
          console.log(e.message)
        }
      }
    }
  }, [isLogin])

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  return (
    <>
      <Layout>
        <Layout.Content style={layoutStyle} id="profile">
          <UpdateProfileForm
            user={user}
            setUser={setUser}
            setIsAvatarModalOpen={setIsAvatarModalOpen}
            setIsPasswordModalOpen={setIsPasswordModalOpen}
          />
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
        <Flex align="center" justify="center">
          <UploadAvatar setUser={setUser} />
        </Flex>
      </Modal>
      <Modal
        centered
        title="Change password"
        onOk={() => {
          setIsPasswordModalOpen(false)
        }}
        onCancel={() => {
          setIsPasswordModalOpen(false)
        }}
        open={isPasswordModalOpen}
        closeIcon={null}
        width="350px">
        <UpdatePasswordForm setIsPasswordModalOpen={setIsPasswordModalOpen} />
      </Modal>
    </>
  )
}

export default Profile
