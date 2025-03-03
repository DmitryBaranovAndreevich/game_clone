import { render } from "@testing-library/react"
import { useGameContextContext } from "../../useGameContext"
import { Bullet } from "./bullet"

// Мокаем useGameContextContext
jest.mock("../../useGameContext", () => ({
  useGameContextContext: jest.fn(),
}))

describe("Bullet component", () => {
  it("should render without crashing", () => {
    // Замокаем возврат хука
    ;(useGameContextContext as jest.Mock).mockReturnValue({
      state: { gameOver: false, isPaused: false, bullets: [] },
      setState: jest.fn(),
    })

    // Отрисовываем компонент
    render(<Bullet />)
  })
})
