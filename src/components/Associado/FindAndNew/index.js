/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

import '../style.css';
import * as format from '../../../utils/helpers';
import { useContextForm } from '../index';
import { useAssociadoContext } from 'context/AssociadoContext';
import Spinner from 'components/common/Spinner';
import NewAssociado from '../newAssociado';
import PesquisaAssociados from '../PesquisaAssociados';

export default function FindAndNew() {
	const inputRef = createRef();

	const [ativo, setAtivo] = useState(true);
	const [modal, setModal] = useState(false);

	const handleShow = () => setModal(true);
	const handleClose = () => setModal(false);

	const { form } = useContextForm();
	const { associado } = useAssociadoContext();

	const findClick = (e) => {
		if (inputRef.current.value) {
			const situacao = ativo ? 'ATIVO' : 'INATIVO';

			if (format.isMatricula(inputRef.current.value)) {
				const matr = inputRef.current.value.padStart(8, 0);
				associado.findBy({
					variables: { matricula: matr, nome: null, status: situacao }
				});
			} else {
				associado.findBy({
					variables: {
						nome: inputRef.current.value,
						matricula: null,
						status: situacao
					}
				});
			}
		}
	};

	const handleChangeChecked = (event) => {
		const { checked } = event.target;

		setAtivo(checked);
	};

	const newAssociado = () => {
		form.setDisableForm(false);
		form.setInputs(NewAssociado);
	};

	useEffect(() => {
		if (associado.data) {
			form.setDisableForm(false);
		} else {
			form.setDisableForm(true);
		}
	}, [associado.data]);

	return (
		<>
			{/* {showForm(associado?.data)} */}
			{/* onClick={(e) => e.preventDefault(e)} */}
			<PesquisaAssociados show={modal} onClose={handleClose} />

			<form className="form-inline" onSubmit={(e) => e.preventDefault(e)}>
				<Container>
					<Row>
						<input
							className="form-control w-50 mr-3"
							type="search"
							placeholder="Digite o nome ou a matrícula"
							aria-label="Digite a matrícula"
							ref={inputRef}
						/>
						<button
							className="btn btn-outline-primary mr-sm-1"
							onClick={findClick}
						>
							Buscar
						</button>
						<button
							className="btn btn-outline-primary mr-sm-1"
							onClick={newAssociado}
						>
							Novo associado
						</button>
						<button
							className="btn btn-outline-success mr-sm-4"
							onClick={handleShow}
						>
							Pesquisar
						</button>
					</Row>
					<Row>
						<Form.Check
							className="mt-2 switch"
							type="switch"
							id="status-busca"
							name="status-busca"
							label={ativo ? 'Consultar os Ativos' : 'Consultar os Inativos'}
							onChange={handleChangeChecked}
							checked={ativo}
						/>
					</Row>
				</Container>
			</form>
			<div className="box">{associado.loading && <Spinner />}</div>
		</>
	);
}
