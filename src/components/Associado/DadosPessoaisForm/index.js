import React from 'react';
import Form from 'react-bootstrap/Form';

import InputMask from 'react-input-mask';

import '../style.css';
import { useContextForm } from '..';
import * as format from '../../../utils/helpers';

export default function DadosPessoaisForm() {
	const { form } = useContextForm();

	const handleChangeValues = (event) => {
		const { name, value } = event.target;

		form.setInputs({ ...form.inputs, [name]: value });
	};

	const handleChangeChecked = (event) => {
		const { name, checked } = event.target;
		let status;

		if (checked) {
			status = 'ATIVO';
		} else {
			status = 'INATIVO';
		}

		form.setInputs({ ...form.inputs, [name]: status });
	};

	return (
		<>
			<form>
				<div className="form-row space-botton">
					<div className="col-10">
						<Form.Label className="label-color">Situação</Form.Label>
						<Form.Check
							type="switch"
							id="status"
							variant="danger"
							label={format.capitalize(form.inputs?.status || '')}
							name="status"
							onChange={handleChangeChecked}
							checked={form.inputs.status === 'ATIVO'}
						/>
						<Form.Label className="display-situacao">
							{form.inputs?.inativoAt
								? `Desfiliou-se em: ${format.formatDateBr(
										form.inputs.inativoAt
								  )}`
								: ''}
						</Form.Label>
					</div>
					<div className="col">
						<Form.Label>Matricula Sindicato</Form.Label>
						<input
							type="text"
							name="matsindicato"
							className="form-control font-weight-bold"
							value={form.inputs?.matsindicato || ''}
							disabled
						/>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Matricula</Form.Label>
						<input
							type="text"
							className={
								!form.inputs?.matricula
									? 'form-control is-invalid'
									: 'form-control font-weight-bold'
							}
							placeholder="Matricula"
							name="matricula"
							onChange={handleChangeValues}
							value={form.inputs.matricula}
							required
						/>
					</div>
					<div className="col-7">
						<Form.Label>Nome</Form.Label>
						<input
							type="text"
							name="nome"
							className={
								!form.inputs?.nome
									? 'form-control is-invalid'
									: 'form-control font-weight-bold'
							}
							placeholder="Nome"
							onChange={handleChangeValues}
							value={form.inputs.nome}
						/>
					</div>
					<div className="col">
						<Form.Label>Data de filiação</Form.Label>
						<Form.Control
							type="date"
							name="dtfiliacao"
							placeholder="Data de filiação"
							onChange={handleChangeValues}
							value={form.inputs?.dtfiliacao || ''}
							className="font-weight-bold"
						/>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Data de nascimento</Form.Label>
						<Form.Control
							type="date"
							name="dtnascimento"
							className={
								!form.inputs?.dtnascimento
									? 'form-control is-invalid'
									: 'form-control font-weight-bold'
							}
							placeholder="Data de nascimento"
							onChange={handleChangeValues}
							value={form.inputs.dtnascimento}
						/>
					</div>
					<div className="col">
						<Form.Label>Cpf</Form.Label>
						<InputMask
							type="text"
							mask="999.999.999-99"
							maskChar=" "
							name="cpf"
							className={
								!form.inputs?.cpf
									? 'form-control is-invalid'
									: 'form-control font-weight-bold'
							}
							placeholder="Cpf"
							onChange={handleChangeValues}
							value={form.inputs.cpf}
						/>
					</div>
					<div className="col">
						<Form.Label>Identidade</Form.Label>
						<input
							type="text"
							placeholder="Identidade"
							name="rg"
							className="form-control font-weight-bold"
							onChange={handleChangeValues}
							value={form.inputs.rg}
						/>
					</div>
					<div className="col">
						<Form.Label>Gênero</Form.Label>
						<select
							id="inputState"
							className="form-control font-weight-bold"
							name="sexo"
							onChange={handleChangeValues}
							value={form.inputs.sexo}
						>
							<option></option>
							{optionsSexo.map((sexo, idx) => {
								return <option key={idx}>{sexo}</option>;
							})}
						</select>
					</div>
					<div className="col">
						<Form.Label>Estado civil</Form.Label>
						<select
							id="inputState"
							className="form-control font-weight-bold"
							name="estadocivil"
							onChange={handleChangeValues}
							value={form.inputs.estadocivil}
						>
							<option></option>
							{optionsEC.map((ec, idx) => {
								return <option key={idx}>{ec}</option>;
							})}
						</select>
					</div>
				</div>
			</form>
		</>
	);
}

//prettier-ignore
const optionsSexo = [ 'Masculino', 'Feminino'];
const optionsEC = ['Solteiro(a)', 'Casado(a)', 'Viúvo(a)', 'Divorciado(a)'];
