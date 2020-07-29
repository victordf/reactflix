import React from 'react';

import PageDefault from '../../components/PageDefault'
import dadosIniciais from '../../data/dados_iniciais.json'
import BannerMain from '../../components/BannerMain'
import Carousel from '../../components/Carousel'

function Home() {

  function renderCategorias() {
    return dadosIniciais.categorias.map((categoria, index) => {
      return (
        <Carousel 
          key={index}
          ignoreFirstVideo
          category={categoria}
        />  
      )
    })
  }

  return (
    <div style={{ background: "#141414" }}>
      <PageDefault>
        <BannerMain 
          videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
          url={dadosIniciais.categorias[0].videos[0].url}
          videoDescription={"O que é Front-end? Trabalhando na área"}
        />

        {renderCategorias()}
      </PageDefault>
    </div>
  );
}

export default Home;
