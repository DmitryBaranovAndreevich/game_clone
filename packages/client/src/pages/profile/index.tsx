import { FC, useState } from "react"
import { Layout } from "antd"
import Sidebar from "../../components/sidebar"
import UpdateProfileForm from "./components/update-profile-form"
import UpdatePasswordModal from "./components/update-password-modal"
import UploadAvatarModal from "./components/upload-avatar-modal"
import { withAuth } from "../../components"

const layoutStyle = {
  height: "100vh",
  width: "calc(100vw - 80px)",
  padding: "10px 0",
}

const Profile: FC = () => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  return (
    <>
      <Layout>
        <Layout.Content style={layoutStyle} id="profile">
          <UpdateProfileForm
            setIsAvatarModalOpen={setIsAvatarModalOpen}
            setIsPasswordModalOpen={setIsPasswordModalOpen}
          />
        </Layout.Content>
        <Sidebar />
      </Layout>
      <UploadAvatarModal
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

export default withAuth(Profile)
