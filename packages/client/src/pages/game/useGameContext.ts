import { useContext } from "react"
import { GameContext } from "./game-utils"

export const useGameContextContext = () => {
  const StoreProviderContext = useContext(GameContext)
  if (!StoreProviderContext) {
    throw new Error(
      `StoreProvider context is not initialized.
       Please check if you wrapped your component with MapContext.Provider`,
    )
  }

  return StoreProviderContext
}
