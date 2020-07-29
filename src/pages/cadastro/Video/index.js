import React from 'react';

import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom';

const CadastroVideo = () => {
  return (
    <PageDefault>
      <h1>Página de cadastro de vídeo</h1>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;