import React, { memo, useState } from 'react';
import { Form, Col, Button, Badge } from 'react-bootstrap';

import './style.css';
import { useEmpresaContext } from 'context/EmpresaContext';
import { useRelatorioContext } from 'context/RelatorioContext';
import Spinner from '../common/Spinner';
import AssociadoTable from './AssociadoTable';

function RelatorioAssociado() {
	const initialFilter = {
		exibeMatricula: false,
		exibeDataFiliacao: false,
		exibeCpf: false,
		exibeDataNascimento: false,
		exibeSexo: false,
		exibeEmpresa: false,
		exibeContatos: false,
		exibeEndereco: false
	};
	const [filtro, setFiltro] = useState(initialFilter);
	const [showTable, setShowTable] = useState(false);
	const { empresas } = useEmpresaContext();
	const { associados } = useRelatorioContext();

	const handleChangeValues = (event) => {
		const { name, value } = event.target;
		let valor = value;

		if (value === 'Desassociado') {
			valor = 'Inativo';
		}
		console.log(filtro);
		setShowTable(false);
		setFiltro({ ...filtro, [name]: valor });
	};

	const handleCheckedRadio = (event) => {
		const { id } = event.target;

		setShowTable(false);
		if (id === 'aposentados') {
			setFiltro({ ...filtro, aposentado: true });
		} else if (id === 'naoaposentados') {
			setFiltro({ ...filtro, aposentado: false });
		} else {
			delete filtro.aposentado;
			setFiltro({ ...filtro });
		}
	};

	const handleChecked = (event) => {
		const { name, checked } = event.target;

		setShowTable(false);
		setFiltro({ ...filtro, [name]: checked });
	};

	const handleClick = () => {
		setShowTable(true);

		associados.filter({
			variables: { ...filtro }
		});
	};

	return (
		<div className="box-rel">
			{/* {associados?.items.length &&
				console.log('resultado', Object.keys(associados?.items[0]))} */}
			{/* {console.log('resultado', Object.keys(associados?.items[0]))} */}

			<h4 className="subtitle">Relatório de associados</h4>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Form.Row>
					<Form.Group as={Col} controlId="formGridStatus">
						<Form.Label>Status do associado</Form.Label>
						<Form.Control
							as="select"
							name="status"
							onChange={handleChangeValues}
							value={
								filtro?.status === 'Inativo' ? 'Desassociado' : filtro?.status
							}
							className="destak"
						>
							<option></option>
							{statusOptions.map((status, idx) => {
								return <option key={idx}>{status}</option>;
							})}
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridEmpresa">
						<Form.Label>Empresa</Form.Label>
						<Form.Control
							as="select"
							name="empresa_sigla"
							onChange={handleChangeValues}
							value={filtro.empresa_sigla}
							className="destak"
						>
							<option></option>
							{empresas &&
								empresas.itens.map((empresa, idx) => {
									return <option key={idx}>{empresa.sigla}</option>;
								})}
						</Form.Control>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} className="adjust-radios">
						<Form.Check
							inline
							type="radio"
							id="aposentados"
							name="aposentados"
							label="Apenas aposentados"
							onChange={handleCheckedRadio}
						/>
						<Form.Check
							inline
							id="naoaposentados"
							type="radio"
							name="aposentados"
							label="Apenas não aposentados"
							onChange={handleCheckedRadio}
						/>
						<Form.Check
							inline
							id="todos"
							type="radio"
							name="aposentados"
							label="Todos"
							onChange={handleCheckedRadio}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row className="space-botton">
					<Badge variant="secondary">Escolha os campos a serem exibidos</Badge>
				</Form.Row>
				<Form.Row className="checks">
					<Form.Group>
						<Form.Check
							inline
							name="exibeMatricula"
							label="Matrícula"
							onChange={handleChecked}
							// checked={filtro.exibeMatricula}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeCpf"
							label="Cpf"
							onChange={handleChecked}
							checked={filtro.exibeCpf}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeDataNascimento"
							label="Data de nascimento"
							onChange={handleChecked}
							checked={filtro.exibeDataNascimento}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeSexo"
							label="Sexo"
							onChange={handleChecked}
							checked={filtro.exibeSexo}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeEmpresa"
							label="Empresa"
							onChange={handleChecked}
							checked={filtro.exibeEmpresa}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeContatos"
							label="Contatos"
							onChange={handleChecked}
							checked={filtro.exibeContatos}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeEndereco"
							label="Endereço"
							onChange={handleChecked}
							checked={filtro.exibeEndereco}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							inline
							name="exibeDataFiliacao"
							label="Data de filiação"
							onChange={handleChecked}
							checked={filtro.exibeDataFiliacao}
						/>
					</Form.Group>
				</Form.Row>

				<Button variant="primary" onClick={handleClick}>
					Consultar
				</Button>
			</Form>

			{associados.loading && <Spinner />}

			{associados?.items.length > 0 && showTable && (
				<AssociadoTable data={associados.items} filtro={filtro} />
			)}
		</div>
	);
}

const statusOptions = ['Ativo', 'Desassociado'];

export default memo(RelatorioAssociado);
