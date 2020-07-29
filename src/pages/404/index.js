import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import sprites from './assets/img/sprites.png'

const Canvas = styled.canvas`
  border: 1px solid #000;
  display: block;
  margin: 0 auto;
`

export default function Error404() {
  let flappyBird = null
  let chao = null
  let planoDeFundo = null
  let mensagemGetReady = null
  const img = new Image()
  img.src = sprites
  let ctx = null

  function loadContext(c) {
    if (c) {
      ctx = c.getContext('2d')
      flappyBird = {
        spriteX: 0,
        spriteY:0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        velocidade: 0,
        gravidade: 0.25,
        atualiza() {
          flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
          flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        desenha() {
          ctx.drawImage(
            img,
            flappyBird.spriteX, flappyBird.spriteY, //SpriteX, SpriteY
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite x e y
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura
          )
        }
      }

      chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: c.height - 112,
        desenha() {
          ctx.drawImage(
            img,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
          )
          ctx.drawImage(
            img,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura
          )
        }
      }

      planoDeFundo = {
        spriteX: 390,
        spriteY: 0,
        largura: 275,
        altura: 204,
        x: 0,
        y: c.height - 204,
        desenha() {
          ctx.fillStyle = '#70c5ce'
          ctx.fillRect(0,0, c.width, c.height)
          ctx.drawImage(
            img,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //SpriteX, SpriteY
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite x e y
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
          )
          ctx.drawImage(
            img,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //SpriteX, SpriteY
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite x e y
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
          )
        }
      }

      mensagemGetReady = {
        sX: 134,
        sY: 0,
        w: 174,
        h: 152,
        x: (c.width / 2) - 174 / 2,
        y: 50,
        desenha() {
          ctx.drawImage(
            img,
            mensagemGetReady.sX, mensagemGetReady.sY, //SpriteX, SpriteY
            mensagemGetReady.w, mensagemGetReady.h, // Tamanho do recorte na sprite x e y
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
          )
        }
      }

      //
      // [Telas]
      //
      let telaAtiva = {}
      function mudaParaTela(novaTela) {
        telaAtiva = novaTela
      }
      const telas = {
        INICIO: {
          desenha() {
            planoDeFundo.desenha()
            chao.desenha()
            flappyBird.desenha()
            mensagemGetReady.desenha()
          },
          atualiza() {

          },
          click() {
            mudaParaTela(telas.JOGO)
          }
        },

        JOGO: {
          desenha() {
            planoDeFundo.desenha()
            chao.desenha()
            flappyBird.desenha()
          },
          atualiza() {
            flappyBird.atualiza()
          }
        }
      }

      function loop() {
        telaAtiva.atualiza()
        telaAtiva.desenha()
        requestAnimationFrame(loop)
      }

      window.addEventListener('click', () => {
        if (telaAtiva.click) {
          telaAtiva.click()
        }
      })

      mudaParaTela(telas.INICIO)
      loop()
    }
  }

  return (
    <>
      <Canvas id="game-canvas" width="320" height="480" ref={loadContext} />
    </>
  )
}
