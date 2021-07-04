import React from 'react';
import Card from 'react-bootstrap/Card';

import './style.css';
import { useAssociadoContext } from '../../context/AssociadoContext';
import Spinner from '../common/Spinner';
import { zeroDecimal } from '../../utils/helpers';

export default function AssociadoCard() {
	const { associados } = useAssociadoContext();

	const total = associados.items.length;
	const ativos = associados.items.filter(
		(item) => item.status.toLowerCase() === 'ativo'
	);

	return (
		<div className="box-totals">
			{associados.associados_loading && <Spinner />}
			<Card
				bg="secondary"
				text="white"
				style={{ width: '18rem' }}
				className="mb-2"
			>
				<Card.Header>Total de Associados</Card.Header>
				<Card.Body>
					<Card.Text>
						<i className="fas fa-sort-amount-up ico-great" />{' '}
						{`${zeroDecimal(ativos.length)} Associados ativos`} <br />
						<i className="fas fa-sort-amount-down ico-bad " />{' '}
						{`${zeroDecimal(total - ativos.length)} Associados inativos`}
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
}
