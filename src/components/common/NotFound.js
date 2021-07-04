import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JumbotronWrapper from './JumbotronWrapper';

import Erro404 from 'assets/images/NotFoundPage.png';

const NotFound = (props) => (
	<JumbotronWrapper {...props.jumbotronProps}>
		{props.children}
	</JumbotronWrapper>
);

NotFound.propTypes = {
	jumbotronProps: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string
	})
};

NotFound.defaultProps = {
	jumbotronProps: {
		title: 'Página não encontrada :('
	},
	children: (
		<>
			<div className="page-notfound">
				<img
					src={Erro404}
					style={{ width: '60%' }}
					alt="Logo Erro 404 página não encontrada."
				/>
				<br />
				<Link to="/">Voltar à Home Page</Link>
			</div>
		</>
	)
};

export default memo(NotFound);
