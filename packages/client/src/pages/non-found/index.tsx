import {FC} from 'react'
import ErrorPage from '../../components/error-page';

const NonFoundPage: FC = () => {
  return (
    <>
      <ErrorPage id={"non-found-page"} title={"404"} subtitle={"Page not found"} />
    </>
  )
}

export default NonFoundPage;