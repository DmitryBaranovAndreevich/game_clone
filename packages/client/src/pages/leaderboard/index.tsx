import { FC, useEffect } from "react"
import { Flex, Image, Layout, Table, TableProps } from "antd"
import Sidebar from "../../components/sidebar"
import { withAuth } from "../../components"
import {
  fetchLeaderboardInfo,
  TFormatedLeaderboardItem,
} from "../../store/slices/leaderboard"
import { useAppDispatch, useAppSelector } from "../../store"

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  padding: "50px 0",
  overflow: "hidden",
  color: "#fff",
}

const tableStyle = {
  maxWidth: "950px",
  width: "100%",
  color: "#fff",
}

const imageStyle = {
  maxWidth: "458px",
  width: "100%",
  marginBottom: "100px",
}

const columns: TableProps<TFormatedLeaderboardItem>["columns"] = [
  {
    title: "Place",
    dataIndex: "place",
    key: "place",
    align: "center",
    showSorterTooltip: { target: "sorter-icon" },
    sorter: (a, b) => a.place - b.place,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    showSorterTooltip: { target: "sorter-icon" },
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    align: "center",
    showSorterTooltip: { target: "sorter-icon" },
    sorter: (a, b) => a.score - b.score,
  },
]

const Leaderboard: FC = () => {
  const dispatch = useAppDispatch()
  const { info, status } = useAppSelector(state => state.leaderboard)

  useEffect(() => {
    dispatch(fetchLeaderboardInfo())
  }, [])

  return (
    <Layout style={layoutStyle}>
      <Layout.Content id="leaderboard" style={{ marginLeft: "80px" }}>
        <Flex vertical align="center" style={{ height: "100%" }}>
          <Image
            src="./src/assets/images/logo/image-logo.png"
            style={imageStyle}
            preview={false}
          />
          <Table<TFormatedLeaderboardItem>
            columns={columns}
            dataSource={info || []}
            pagination={false}
            loading={status === "pending"}
            scroll={{ y: 350 }}
            showSorterTooltip={{ target: "sorter-icon" }}
            style={tableStyle}
          />
        </Flex>
      </Layout.Content>
      <Sidebar />
    </Layout>
  )
}

export default withAuth(Leaderboard)
