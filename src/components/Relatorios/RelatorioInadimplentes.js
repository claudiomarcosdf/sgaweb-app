import React, { memo, useState } from 'react';
import { useRelatorioContext } from '../../context/RelatorioContext';

import { Form, Col, Button } from 'react-bootstrap';
import Spinner from '../common/Spinner';

import InadimplenteTable from './InadimplenteTable';

function RelatorioInadimplentes() {
	const yearDefault = new Date().getFullYear();
	const initialFilter = {
		mes: '',
		ano: yearDefault.toString()
	};

	const [filter, setFilter] = useState(initialFilter);
	const [showTable, setShowTable] = useState(false);
	const { inadimplentes } = useRelatorioContext();

	const handleChangeValues = (e) => {
		let value = e.target.value;
		setShowTable(false);
		setFilter({ ...filter, [e.target.name]: value });
	};

	const handleClick = () => {
		filtrar(filter.ano, filter.mes);
	};

	const filtrar = (ano, mes) => {
		setShowTable(true);
		inadimplentes.period({
			variables: { ano, mes }
		});
	};

	return (
		<div className="box-rel">
			<h4 className="subtitle">Relatório de inadimplentes por período</h4>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Form.Row className="space-button">
					<Form.Group as={Col} controlId="formGridMes">
						<Form.Label>Mês</Form.Label>
						<Form.Control
							as="select"
							name="mes"
							onChange={handleChangeValues}
							value={filter.mes}
							className="destak"
						>
							<option></option>
							{monthOptions.map(({ month, description }, idx) => {
								return (
									<option key={idx} value={month}>
										{description}
									</option>
								);
							})}
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridAno">
						<Form.Label>Ano</Form.Label>
						<Form.Control
							type="number"
							minLength={4}
							maxLength={4}
							name="ano"
							onChange={handleChangeValues}
							value={filter.ano}
							className="destak"
						/>
					</Form.Group>
				</Form.Row>
				<Button variant="primary" onClick={handleClick}>
					Consultar
				</Button>
			</Form>

			{inadimplentes.loading && <Spinner />}

			{inadimplentes?.items.length > 0 && showTable && (
				<InadimplenteTable data={inadimplentes.items} filtro={filter} />
			)}
		</div>
	);
}

//prettier-ignore
const monthOptions = [
  {month: '01', description: 'Janeiro'}, {month: '02', description: 'Fevereiro'},
  {month: '03', description: 'Março'}, {month: '04', description: 'Abril'},
  {month: '05', description: 'Maio'}, {month: '06', description: 'Junho'},
  {month: '07', description: 'Julho'}, {month: '08', description: 'Agosto'},
  {month: '09', description: 'Setembro'}, {month: '10', description: 'Outubro'},
  {month: '11', description: 'Novembro'}, {month: '12', description: 'Dezembro'},
]

export default memo(RelatorioInadimplentes);
