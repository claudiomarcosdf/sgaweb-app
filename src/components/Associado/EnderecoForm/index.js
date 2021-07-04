import React from 'react';

import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import InputMask from 'react-input-mask';

import '../style.css';
import { useContextForm } from '..';
import * as api from '../../../services';
import { toast } from 'react-toastify';

export default function EnderecoForm() {
	const { form } = useContextForm();

	const handleChangeValues = (event) => {
		const { name, value } = event.target;

		form.setInputs({ ...form.inputs, [name]: value });
	};

	const handleFindCep = (event) => {
		const cep = event.target.value;

		api
			.findCep(cep)
			.then((response) => {
				const { data } = response;
				populateFields(data);
			})
			.catch((error) => {
				toast.error('Cep inválido.');
			});
	};

	const populateFields = (data) => {
		form.setInputs({
			...form.inputs,
			logradouro: data.logradouro,
			cidade: data.localidade,
			bairro: data.bairro,
			estado: data.uf
		});
	};

	return (
		<>
			<form>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Cep</Form.Label>
						<InputMask
							type="text"
							mask="99.999-999"
							maskChar=" "
							className="form-control font-weight-bold"
							placeholder="Cep"
							name="cep"
							onChange={handleChangeValues}
							onBlur={handleFindCep}
							value={form.inputs.cep}
						/>
					</div>
					<div className="col-7">
						<Form.Label>Logradouro</Form.Label>
						<input
							type="text"
							className="form-control font-weight-bold"
							placeholder="Logradouro"
							name="logradouro"
							onChange={handleChangeValues}
							value={form.inputs.logradouro}
						/>
					</div>
					<div className="col">
						<Form.Label>Estado</Form.Label>
						<select
							id="inputState"
							className="form-control font-weight-bold"
							name="estado"
							onChange={handleChangeValues}
							value={form.inputs.estado}
						>
							<option></option>
							{optionsUFs.map((uf, idx) => {
								return <option key={idx}>{uf}</option>;
							})}
						</select>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Bairro</Form.Label>
						<input
							type="text"
							className="form-control font-weight-bold"
							placeholder="Bairro"
							name="bairro"
							onChange={handleChangeValues}
							value={form.inputs.bairro}
						/>
					</div>
					<div className="col">
						<Form.Label>Cidade</Form.Label>
						<input
							type="text"
							className="form-control font-weight-bold"
							placeholder="Cidade"
							name="cidade"
							onChange={handleChangeValues}
							value={form.inputs.cidade}
						/>
					</div>
				</div>
				<div className="form-row space-badge">
					<div className="col">
						<Badge className="badge" variant="secondary">
							Contatos
						</Badge>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Email</Form.Label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">@</div>
							</div>
							<input
								type="text"
								className="form-control font-weight-bold"
								id="email"
								placeholder="Email"
								name="email"
								onChange={handleChangeValues}
								value={form.inputs.email}
							/>
						</div>
					</div>
				</div>
				<div className="form-row space-botton">
					<div className="col">
						<Form.Label>Celular1</Form.Label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">
									<i className="fas fa-mobile-alt"></i>
								</div>
							</div>
							<InputMask
								type="text"
								mask="(99) 99999-9999"
								maskChar=" "
								className="form-control font-weight-bold"
								placeholder="Celular1"
								name="celular1"
								onChange={handleChangeValues}
								value={form.inputs.celular1}
							/>
						</div>
					</div>
					<div className="col">
						<Form.Label>Celular2</Form.Label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">
									<i className="fas fa-mobile-alt"></i>
								</div>
							</div>
							<InputMask
								type="text"
								mask="(99) 99999-9999"
								maskChar=" "
								className="form-control font-weight-bold"
								placeholder="Celular2"
								name="celular2"
								onChange={handleChangeValues}
								value={form.inputs.celular2}
							/>
						</div>
					</div>
					<div className="col">
						<Form.Label>Telefone de residência</Form.Label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">
									<i className="fas fa-phone-alt"></i>
								</div>
							</div>
							<InputMask
								type="text"
								mask="(99) 9999-9999"
								maskChar=" "
								className="form-control font-weight-bold"
								placeholder="Telefone residência"
								name="telefoneresidencia"
								onChange={handleChangeValues}
								value={form.inputs.telefoneresidencia}
							/>
						</div>
					</div>
					<div className="col">
						<Form.Label>Telefone do trabalho</Form.Label>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<div className="input-group-text">
									<i className="fas fa-phone-alt"></i>
								</div>
							</div>
							<InputMask
								type="text"
								mask="(99) 9999-9999"
								maskChar=" "
								className="form-control font-weight-bold"
								placeholder="Telefone trabalho"
								name="telefonetrabalho"
								onChange={handleChangeValues}
								value={form.inputs.telefonetrabalho}
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

//prettier-ignore
const optionsUFs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
