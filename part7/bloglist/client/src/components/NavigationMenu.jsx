import { Link } from 'react-router-dom'

const NavigationMenu = ({ name, logout }) => {
  const padding = {
    padding: 3,
  }
  const background = {
    padding: 5,
    backgroundColor: 'lightGray',
  }

  return (
    <div style={background}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <a style={padding}>
        {name} logged in <button onClick={logout}>logout</button>
      </a>
    </div>
  )
}

export default NavigationMenu
