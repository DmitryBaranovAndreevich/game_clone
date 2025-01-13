import { FC, useEffect, useState } from "react"
import { Layout } from "antd"
import { getCookie } from "../../utils"
import { generatePath, useLocation, useNavigate } from "react-router-dom"
import { TUser, UserApi } from "../../services/api/user-api"
import Sidebar from "../../components/sidebar"
import UpdateProfileForm from "./components/update-profile-form"
import UpdatePasswordModal from "./components/update-password-modal"
import UploadAvatarModal from "./components/upload-avatar-modal"

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  padding: "50px 0",
  overflow: "hidden",
}

const userApi = new UserApi()

const Profile: FC = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
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
      <UploadAvatarModal
        setUser={setUser}
        isAvatarModalOpen={isAvatarModalOpen}
        setIsAvatarModalOpen={setIsAvatarModalOpen}
      />
      <UpdatePasswordModal
        isPasswordModalOpen={isPasswordModalOpen}
        setIsPasswordModalOpen={setIsPasswordModalOpen}
      />
    </>
  )
}

export default Profile
