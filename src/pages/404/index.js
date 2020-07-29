import React from 'react'
import styled from 'styled-components'

import sprites from './assets/img/sprites.png'
import hitFile from './assets/effects/hit.wav'
import puloFile from './assets/effects/pulo.wav'

const Canvas = styled.canvas`
  border: 1px solid #000;
  display: block;
  margin: 0 auto;
`

export default function Error404() {
  let planoDeFundo = null
  let mensagemGetReady = null
  let scoreBoard = null
  let frames = 0
  const globais = {}
  const som_hit = new Audio()
  som_hit.src = hitFile
  const som_pulo = new Audio()
  som_pulo.src = puloFile
  const img = new Image()
  img.src = sprites
  let ctx = null

  function fazColisao(obj1, obj2) {
    return (obj1.y + obj1.altura) >= obj2.y
  }

  function loadContext(c) {
    if (c) {
      ctx = c.getContext('2d')

      function criaFlappyBird() {
        return {
          spriteX: 0,
          spriteY:0,
          largura: 33,
          altura: 24,
          x: 10,
          y: 50,
          pulo: 4.6,
          pula() {
            globais.flappyBird.velocidade = - globais.flappyBird.pulo
            som_pulo.play()
          },
          velocidade: 0,
          gravidade: 0.25,
          atualiza() {
            if (!fazColisao(globais.flappyBird, globais.chao)) {
              globais.flappyBird.velocidade = globais.flappyBird.velocidade + globais.flappyBird.gravidade
              globais.flappyBird.y = globais.flappyBird.y + globais.flappyBird.velocidade
            } else {
              som_hit.play()
              setTimeout(
                mudaParaTela(telas.INICIO)
              , 500)
            }
          },
          movimentos: [
            { spriteX: 0, spriteY: 0}, // asa pra cima
            { spriteX: 0, spriteY: 26}, // asa pro meio
            { spriteX: 0, spriteY: 52},
            { spriteX: 0, spriteY: 26}, // asa pro meio
          ],
          frameAtual: 0,
          atualizaFrame() {
            const intervalFrames = 10
            const passouOIntervalo = frames % intervalFrames === 0
            if (passouOIntervalo) {
              const baseDoIncremento = 1
              const incremento = baseDoIncremento + globais.flappyBird.frameAtual
              const baseRepeticao = globais.flappyBird.movimentos.length
              globais.flappyBird.frameAtual = incremento % baseRepeticao
            }
          },
          desenha() {
            globais.flappyBird.atualizaFrame()
            const { spriteX, spriteY } = globais.flappyBird.movimentos[globais.flappyBird.frameAtual]
            ctx.drawImage(
              img,
              spriteX, spriteY,
              globais.flappyBird.largura, globais.flappyBird.altura, // Tamanho do recorte na sprite x e y
              globais.flappyBird.x, globais.flappyBird.y,
              globais.flappyBird.largura, globais.flappyBird.altura
            )
          }
        }
      }

      function criaChao() {
        return {
          spriteX: 0,
          spriteY: 610,
          largura: 224,
          altura: 112,
          x: 0,
          y: c.height - 112,
          atualiza() {
            const movimentoDoChao = 1
            const repeteEm = globais.chao.largura / 2
            const movimentacao = globais.chao.x - movimentoDoChao

            globais.chao.x = movimentacao % repeteEm
          },
          desenha() {
            ctx.drawImage(
              img,
              globais.chao.spriteX, globais.chao.spriteY,
              globais.chao.largura, globais.chao.altura,
              globais.chao.x, globais.chao.y,
              globais.chao.largura, globais.chao.altura
            )
            ctx.drawImage(
              img,
              globais.chao.spriteX, globais.chao.spriteY,
              globais.chao.largura, globais.chao.altura,
              (globais.chao.x + globais.chao.largura), globais.chao.y,
              globais.chao.largura, globais.chao.altura
            )
          }
        }
      }

      function criaCanos() {
        return {
          largura: 52,
          altura: 400,
          chao: {
            spriteX: 0,
            spriteY: 169
          },
          ceu: {
            spriteX: 52,
            spriteY: 169
          },
          espaco: 80,
          pares: [],
          desenha() {
            globais.canos.pares.forEach((par) => {
              const yRandom = par.y
              const espacamentoEntraCanos = 90
  
              const canoCeuX = par.x
              const canoCeuY = yRandom
              ctx.drawImage(
                img,
                globais.canos.ceu.spriteX, globais.canos.ceu.spriteY,
                globais.canos.largura, globais.canos.altura,
                canoCeuX, canoCeuY,
                globais.canos.largura, globais.canos.altura
              )
  
              const canoChaoX = par.x
              const canoChaoY = globais.canos.altura + espacamentoEntraCanos + yRandom
              ctx.drawImage(
                img,
                globais.canos.chao.spriteX, globais.canos.chao.spriteY,
                globais.canos.largura, globais.canos.altura,
                canoChaoX, canoChaoY,
                globais.canos.largura, globais.canos.altura
              )

              par.canoCeu = {
                x: canoCeuX,
                y: globais.canos.altura + canoCeuY
              }

              par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
              }
            })
          },
          temColisaoComOFlappyBird(par) {
            const cabecaDoFllapy = globais.flappyBird.y
            const peDoFllapy = globais.flappyBird.y + globais.flappyBird.altura
            if (globais.flappyBird.x >= par.x) {
              if (cabecaDoFllapy <= par.canoCeu.y) {
                return true
              }

              if (peDoFllapy >= par.canoChao.y) {
                return true
              }
            }
            return false
          },
          atualiza() {
            const passou100Frames = frames % 100 === 0
            if (passou100Frames) {
              globais.canos.pares.push({
                x: c.width,
                y: -150 * (Math.random() + 1)
              })
            }

            globais.canos.pares.forEach((par) => {
              par.x = par.x - 2

              if (globais.canos.temColisaoComOFlappyBird(par)) {
                som_hit.play()
                mudaParaTela(telas.INICIO)
              }

              if (par.x + globais.canos.largura <= 0) {
                globais.canos.pares.shift()
              }
            })
          }
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

      scoreBoard = {
        sX: 134,
        sY: 197,
        w: 226,
        h: 116,
        x: 45,
        y: 230,
        desenha() {
          ctx.drawImage(
            img,
            scoreBoard.sX, scoreBoard.sY, //SpriteX, SpriteY
            scoreBoard.w, scoreBoard.h, // Tamanho do recorte na sprite x e y
            scoreBoard.x, scoreBoard.y,
            scoreBoard.w, scoreBoard.h
          )
        }
      }

      //
      // [Telas]
      //
      let telaAtiva = {}
      function mudaParaTela(novaTela) {
        telaAtiva = novaTela
        if (telaAtiva.inicializa) {
          telaAtiva.inicializa()
        }
      }
      const telas = {
        INICIO: {
          inicializa() {
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
            globais.canos = criaCanos()
          },
          desenha() {
            planoDeFundo.desenha()
            globais.flappyBird.desenha()
            globais.chao.desenha()
            // scoreBoard.desenha()
            mensagemGetReady.desenha()
          },
          atualiza() {
            globais.chao.atualiza()
          },
          click() {
            mudaParaTela(telas.JOGO)
          }
        },

        JOGO: {
          desenha() {
            planoDeFundo.desenha()
            globais.canos.desenha()
            globais.chao.desenha()
            globais.flappyBird.desenha()
          },
          atualiza() {
            globais.canos.atualiza()
            globais.chao.atualiza()
            globais.flappyBird.atualiza()
          },
          click() {
            globais.flappyBird.pula()
          }
        }
      }

      function loop() {
        telaAtiva.atualiza()
        telaAtiva.desenha()
        frames++
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
