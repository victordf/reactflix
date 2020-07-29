import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Menu from '../Menu'
import Footer from '../Footer'

const Main = styled.main`
  background-color: var(--black);
  color: var(--white);
  flex: 1;
  padding: 50px 5px 5px 0px;
`

export default function PageDefault({ children }) {
  return (
    <>
      <Menu />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}
