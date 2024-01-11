import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div>
      <Link to="/Login">Login</Link>
      <Link to="/Signup">Signup</Link>
      <Link to="/Page404">Page404</Link>
    </div>
  )
}

export default Navbar
