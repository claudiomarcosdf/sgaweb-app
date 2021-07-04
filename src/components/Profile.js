import React, { memo, useContext } from 'react';
import { JumbotronWrapper } from './common';
import { Row, Col, Image } from 'react-bootstrap';

import { AuthContext } from '../context/AuthContext';
import Img from '../assets/images/user.png';

function Profile() {
	const context = useContext(AuthContext);

	return (
		<JumbotronWrapper title="Perfil" col={{ md: '6' }}>
			<Row>
				<Col xs={2} md={2}>
					<Image src={`${Img}`} roundedCircle className="image-perfil" />
				</Col>
			</Row>
			<span>{context.user.nome}</span>
			<br />
			<span className="email">{context.user.email}</span>
			<br />
			<span>Perfil:</span>
			<br />
			<span>[</span>
			<span className="font-perfil">{context.user.perfis.join(', ')}</span>
			<span>]</span>
		</JumbotronWrapper>
	);
}

export default memo(Profile);
