import React from 'react';
import Form from 'react-bootstrap/Form';

import '../style.css';
import { useContextForm } from '..';
import { useEmpresaContext } from 'context/EmpresaContext';
import Spinner from '../../common/Spinner';

export default function EmpresaForm() {
	const { form } = useContextForm();
	const { empresas, loading } = useEmpresaContext();

	const handleChangeValues = (event) => {
		const { name, value } = event.target;

		form.setInputs({ ...form.inputs, [name]: value });
	};

	const handleSelectSigla = (event) => {
		const { value } = event.target;

		const empresa = empresas.itens.find((empresa) => empresa.sigla === value);
		form.setInputs({
			...form.inputs,
			sigla: value,
			nome_empresa: empresa.nome
		});
	};

	const handleChangeChecked = (event) => {
		const { name, checked } = event.target;

		form.setInputs({ ...form.inputs, [name]: checked });
	};

	return (
		<>
			{loading && <Spinner />}
			<form>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Aposentado</Form.Label>
						<Form.Check
							type="switch"
							id="aposentado"
							label={form.inputs.aposentado ? 'Sim' : 'Não'}
							name="aposentado"
							checked={form.inputs.aposentado}
							onChange={handleChangeChecked}
						/>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col-3">
						<Form.Label>Sigla da empresa</Form.Label>
						<select
							id="inputState"
							className={
								!form.inputs.sigla
									? 'form-control is-invalid'
									: 'form-control font-weight-bold'
							}
							name="sigla"
							onChange={handleSelectSigla}
							value={form.inputs.sigla}
						>
							<option disabled> </option>
							{empresas &&
								empresas.itens.map((empresa, idx) => {
									return <option key={idx}>{empresa.sigla}</option>;
								})}
						</select>
					</div>
					<div className="col">
						<Form.Label>Nome da empresa</Form.Label>
						<input
							type="text"
							className="form-control font-weight-bold"
							placeholder="Nome da empresa"
							name="nome_empresa"
							value={form.inputs.nome_empresa}
							onChange={handleChangeValues}
						/>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Órgão</Form.Label>
						<input
							type="text"
							className="form-control font-weight-bold"
							placeholder="Nome do órgão"
							name="orgao"
							value={form.inputs.orgao}
							onChange={handleChangeValues}
						/>
					</div>
					<div className="col">
						<Form.Label>Função</Form.Label>
						<input
							type="text"
							className="form-control font-weight-bold"
							placeholder="Função"
							name="funcao"
							value={form.inputs.funcao}
							onChange={handleChangeValues}
						/>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Data de admissão</Form.Label>
						<Form.Control
							type="date"
							placeholder="Data de admissão"
							className={
								!form.inputs.dtadmissao
									? 'form-control is-invalid'
									: 'form-control font-weight-bold'
							}
							name="dtadmissao"
							value={form.inputs.dtadmissao}
							onChange={handleChangeValues}
						/>
					</div>
				</div>
			</form>
		</>
	);
}
