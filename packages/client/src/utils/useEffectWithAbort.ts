import { useEffect } from "react"

export type TElement = Window | Document | HTMLElement
export type TEvent = Event | MouseEvent | KeyboardEvent | undefined

export const useEffectWithAbort = (
  element: TElement,
  type: string,
  listener: (e?: TEvent) => void,
  dependencies: React.DependencyList = [],
) => {
  useEffect(() => {
    const controller = new AbortController()

    element.addEventListener(type, listener, {
      signal: controller.signal,
    })

    return () => {
      controller.abort()
    }
  }, dependencies)
}
