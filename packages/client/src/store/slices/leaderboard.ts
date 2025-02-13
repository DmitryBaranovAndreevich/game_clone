import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  LeaderboardApi,
  TAddLeaderboardItemRequest,
  TLeaderboardItem,
} from "../../services/api/leaderboard-api"

export type TFormatedLeaderboardItem = {
  key: string
  id: number
  place: number
  name: string
  score: number
}
export const formateData = (
  data: TLeaderboardItem[],
): TFormatedLeaderboardItem[] => {
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

const fetchLeaderboardInfo = createAsyncThunk(
  "leaderboard/fetchLeaderboardInfo",
  async () => {
    try {
      const response = await leaderboardApi.getTeam()
      return response
    } catch (e) {
      if (e instanceof Error) {
        throw e
      }
    }
  },
)

const addLeaderboardItem = createAsyncThunk(
  "leaderboard/addLeaderboardItem",
  async (data: TAddLeaderboardItemRequest) => {
    try {
      const response = await leaderboardApi.addItem(data)
      return response
    } catch (e) {
      if (e instanceof Error) {
        throw e
      }
    }
  },
)

type TLoadStatus = "pending" | "success" | "error"

export type TLeaderboardState = {
  info: TFormatedLeaderboardItem[] | [] | null
  status: TLoadStatus | "init"
}

const initialState = {
  info: null,
  status: "init",
} satisfies TLeaderboardState as TLeaderboardState

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboardStatusPending: state => {
      state.status = "pending"
    },
    setLeaderboardStatusSuccess: state => {
      state.status = "success"
    },
    setLeaderboardStatusError: state => {
      state.status = "error"
    },
    setLeaderboardInfo: (
      state,
      action: PayloadAction<TFormatedLeaderboardItem[] | []>,
    ) => {
      state.info = action.payload
    },
    setInitState: state => {
      state.info = null
      state.status = "init"
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLeaderboardInfo.pending, state => {
        state.status = "pending"
      })
      .addCase(fetchLeaderboardInfo.fulfilled, (state, action) => {
        if (action.payload && action.payload.length > 0) {
          state.info = formateData(action.payload)
        } else if (action.payload && action.payload.length === 0) {
          state.info = []
        }
        state.status = "success"
      })
      .addCase(fetchLeaderboardInfo.rejected, state => {
        state.status = "error"
      })
      .addCase(addLeaderboardItem.pending, state => {
        state.status = "pending"
      })
      .addCase(addLeaderboardItem.fulfilled, state => {
        state.status = "success"
      })
      .addCase(addLeaderboardItem.rejected, state => {
        state.status = "error"
      })
  },
})

const {
  setLeaderboardStatusPending,
  setLeaderboardStatusSuccess,
  setLeaderboardStatusError,
  setLeaderboardInfo,
  setInitState,
} = leaderboardSlice.actions

export {
  setLeaderboardStatusPending,
  setLeaderboardStatusSuccess,
  setLeaderboardStatusError,
  setLeaderboardInfo,
  setInitState,
  fetchLeaderboardInfo,
  addLeaderboardItem,
}
export default leaderboardSlice.reducer
