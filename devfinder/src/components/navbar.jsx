// Navbar: the bar at the top of every page.


import { Link, NavLink } from 'react-router-dom'
import './navbar.css'


function Navbar({ savedCount }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* <Link> changes the page WITHOUT reloading the browser (unlike <a href>). */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-mark">{'</>'}</span>
          DevFinder
        </Link>

        <nav className="navbar-links">
         
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/saved">Saved ({savedCount})</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
