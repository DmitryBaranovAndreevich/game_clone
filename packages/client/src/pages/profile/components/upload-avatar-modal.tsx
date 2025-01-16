import { FC, useState } from "react"
import { Flex, GetProp, Modal, Upload, UploadProps } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { UserApi } from "../../../services/api/user-api"
import { useDispatch } from "react-redux"
import userSlice from "../../../store/slices/user"

type TComponentProps = {
  isAvatarModalOpen: boolean
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const userApi = new UserApi()
const { actions: USER } = userSlice

const UploadAvatarModal: FC<TComponentProps> = ({
  isAvatarModalOpen,
  setIsAvatarModalOpen,
}) => {
  const dispatch = useDispatch()

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

        try {
          userApi.getUser().then(response => {
            const userData = response
            if (userData) {
              dispatch(USER.SET_USER_ITEM(userData))
            }
          })
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message)
          }
        }
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
