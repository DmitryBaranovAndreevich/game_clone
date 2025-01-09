import { FC, useState } from "react"
import { Flex, GetProp, Modal, Upload, UploadProps } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { TUser, UserApi } from "../../../services/api/user-api"

type TComponentProps = {
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>
  isAvatarModalOpen: boolean
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const userApi = new UserApi()

const UploadAvatarModal: FC<TComponentProps> = ({
  setUser,
  isAvatarModalOpen,
  setIsAvatarModalOpen,
}) => {
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
          const userData = response
          if (userData) {
            setUser(userData as TUser)
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

  return (
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
      </Flex>
    </Modal>
  )
}

export default UploadAvatarModal
