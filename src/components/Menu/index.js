import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/img/logo.png'
import Button from '../Button'
import './Menu.css'

function Menu() {
  return (
    <nav className="Menu">
      <Link to="/">
        <img src={logo} className="Logo" alt="VictorFlix logo"/>
      </Link>

      <Button as={Link} to="/cadastro/video" className="ButtonLink">
        Novo Vídeo
      </Button>
    </nav>
  )
}

export default Menu