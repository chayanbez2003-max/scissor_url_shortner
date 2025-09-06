import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './ui/button'

const Header = () => {

  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">
      <img src="/scissor_logo.png" className="h-16" alt="scissor logo" />
      </Link>

      {/* <div>
        <Button>Login</Button>
      </div> */}
    </nav>
  )
}

export default Header
