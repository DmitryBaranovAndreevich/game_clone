import { Link } from "react-router-dom"
import { withAuth } from "../../components"

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          {" "}
          <Link to="/login">Login</Link>
        </li>
        <li>
          {" "}
          <Link to="/register">Register</Link>
        </li>
        <li>
          {" "}
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          {" "}
          <Link to="/server-error">Server error</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          {" "}
          <Link to="/*">Non Found*</Link>
        </li>
      </ul>
    </nav>
  )
}

export default withAuth(Navigation)
