import React from 'react'

import logo from '../../assets/img/logo.png'
import Button from '../Button'
import './Menu.css'

function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img src={logo} className="Logo" alt="VictorFlix logo"/>
      </a>

      <Button as="a" href="/" className="ButtonLink">
        Novo Vídeo
      </Button>
    </nav>
  )
}

export default Menu