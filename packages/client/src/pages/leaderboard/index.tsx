import { FC, useEffect, useState } from "react"
import { Flex, Image, Layout, Table, TableProps } from "antd"
import Sidebar from "../../components/sidebar"
import { withAuth } from "../../components"
import { LeaderboardApi } from "../../services/api/leaderboard-api"

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

export type TLeaderboardItem = {
  data: {
    score: number
    name: string
    id: number
  }
}

export type TFormatedLeaderboardItem = {
  key: string
  id: number
  place: number
  name: string
  score: number
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

const formateData = (data: TLeaderboardItem[]): TFormatedLeaderboardItem[] => {
  const formatedData = data
    .filter(item => {
      if (
        item.data.id === null ||
        item.data.id === undefined ||
        item.data.name === null ||
        item.data.name === undefined ||
        item.data.score === null ||
        item.data.score === undefined
      ) {
        return null
      } else {
        return item
      }
    })
    .map((item, index): TFormatedLeaderboardItem => {
      const { id, name, score } = item.data

      return {
        key: `${name}_${id}`,
        id,
        place: index + 1,
        name,
        score,
      }
    })

  return formatedData
}

const leaderboardApi = new LeaderboardApi()

const Leaderboard: FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<
    TFormatedLeaderboardItem[] | []
  >([])

  const getLeaderboard = async () => {
    try {
      const response = await leaderboardApi.getTeam()

      if (response) {
        setLeaderboardData(formateData(response))
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getLeaderboard()
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
            dataSource={leaderboardData}
            pagination={false}
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
