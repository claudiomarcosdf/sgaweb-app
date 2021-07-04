import React, { useState } from 'react';
import { Form, Col, Button, Badge } from 'react-bootstrap';

import '../style.css';

export default function FindFilter({ onClick }) {
	const yearDefault = new Date().getFullYear();
	const initialFilter = {
		mes: '',
		ano: yearDefault.toString(),
		rubrica: '',
		orgao: '',
		matricula: '',
		exibirOrgao: false,
		exibirRubrica: false
	};
	const [filter, setFilter] = useState(initialFilter);

	const handleClick = () => {
		onClick(filter);
	};

	const handleChangeValues = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.value });
	};

	const handleChecked = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.checked });
	};

	return (
		<div>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Form.Row>
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
				<Form.Row className="space-botton">
					<Badge variant="secondary">Filtros opcionais abaixo</Badge>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} controlId="formGridOrgao">
						<Form.Label>Órgão</Form.Label>
						<Form.Control
							placeholder="Digite o número do órgão"
							name="orgao"
							onChange={handleChangeValues}
							value={filter.orgao}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridRubrica">
						<Form.Label>Rubrica</Form.Label>
						<Form.Control
							placeholder="Digite o número da rubrica"
							name="rubrica"
							onChange={handleChangeValues}
							value={filter.rubrica}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridMatricula">
						<Form.Label>Matrícula</Form.Label>
						<Form.Control
							placeholder="Digite a matrícula"
							name="matricula"
							onChange={handleChangeValues}
							value={filter.matricula}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row className="checks">
					<Form.Group>
						<Form.Check
							inline
							name="exibirOrgao"
							label="Exibir Órgão"
							onChange={handleChecked}
							checked={filter.exibirOrgao}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibirRubrica"
							label="Exibir rubrica"
							onChange={handleChecked}
							checked={filter.exibirRubrica}
						/>
					</Form.Group>
				</Form.Row>

				<Button variant="primary" onClick={handleClick}>
					Consultar
				</Button>
			</Form>
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
