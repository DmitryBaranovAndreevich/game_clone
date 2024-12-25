import { FC } from "react"
import ErrorPage from "../../components/error-page"

const ServerErrorPage: FC = () => {
  return (
    <ErrorPage
      id={"server-error-page"}
      title={"500"}
      subtitle={"Oops, that's our bad."}
    />
  )
}

export default ServerErrorPage
