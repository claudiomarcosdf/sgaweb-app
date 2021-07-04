import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';

import './style.css';

export default function index({ variant, onClick, onClose }) {
	const handleClick = () => {
		onClick(true);
	};

	const handleClose = () => {
		onClose(true);
	};

	return (
		<>
			{variant === 'danger' ? (
				<>
					<Alert
						variant="danger"
						className="box"
						onClose={handleClose}
						dismissible
					>
						<Alert.Heading className="heading">
							<i className="fas fa-exclamation-triangle" /> O nome do arquivo
							não corresponde ao formato padrão.
						</Alert.Heading>
						<hr />
						<p className="bodyAlert">
							O formato padrão do nome do arquivo deve conter o mês e o ano
							correspondente. <br />
							Exemplo: 001-000-PAGCON01-40392-<strong>042020</strong>-01-09.dat.
						</p>
					</Alert>
				</>
			) : (
				<>
					<Alert
						variant="success"
						className="box"
						onClose={handleClose}
						dismissible
					>
						<Alert.Heading className="heading">
							<i className="fas fa-check-circle"></i> Tudo certo! Deseja
							importar o arquivo agora?
						</Alert.Heading>
						<hr />
						<div className="bodyAlert">
							<Button onClick={handleClick} variant="outline-success">
								Importar
							</Button>
						</div>
					</Alert>
				</>
			)}
		</>
	);
}
