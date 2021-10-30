import React from 'react';
import { Link } from 'react-router-dom';

import ErroServer from 'assets/images/server-error.png';

function ConnectionError() {
	return (
		<div className="server-notfound">
			<img
				src={ErroServer}
				style={{ width: '16%' }}
				alt="Erro na conexão com a API"
			/>
			<h3>Erro na conexão com a aplicação servidora.</h3>
			<h4>Aguarde alguns instantes e tente novamente!!!</h4>
			<br />
			<Link to="/">Voltar à Home Page</Link>
		</div>
	);
}

export default ConnectionError;
