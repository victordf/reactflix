import React from 'react'
import styled from 'styled-components'

import sprites from './assets/img/sprites.png'

const Canvas = styled.canvas`
  border: 1px solid #000;
  display: block;
  margin: 0 auto;
  width: 320px;
  height: 480px;
`

export default function Error404() {
  const img = new Image()
  img.src = sprites
  let ctx = null

  function loadContext(c) {
    ctx = c.getContext('2d')
  }

  return (
    <>
      <Canvas id="game-canvas" ref={loadContext} />
    </>
  )
}
