import { RootState } from "./store"

declare const __SERVER_PORT__: number
export {}

declare global {
  interface Window {
    APP_INITIAL_STATE?: Partial<RootState>
  }
}
