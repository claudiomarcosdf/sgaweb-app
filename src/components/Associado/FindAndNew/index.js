/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect } from 'react';

import '../style.css';
import * as format from '../../../utils/helpers';
import { useContextForm } from '../index';
import { useAssociadoContext } from 'context/AssociadoContext';
import Spinner from 'components/common/Spinner';
import NewAssociado from '../newAssociado';

export default function FindAndNew() {
	const inputRef = createRef();

	const { form } = useContextForm();
	const { associado } = useAssociadoContext();

	const findClick = (e) => {
		if (inputRef.current.value) {
			if (format.isMatricula(inputRef.current.value)) {
				const matr = inputRef.current.value.padStart(8, 0);
				associado.findBy({
					variables: { matricula: matr, nome: null }
				});
			} else {
				associado.findBy({
					variables: { nome: inputRef.current.value, matricula: null }
				});
			}
		}
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

			<form className="form-inline" onClick={(e) => e.preventDefault(e)}>
				<input
					className="form-control mr-sm-2 w-50"
					type="search"
					placeholder="Digite o nome ou a matrícula"
					aria-label="Digite a matrícula"
					ref={inputRef}
				/>
				<button
					className="btn btn-outline-primary my-0 mr-sm-1"
					onClick={findClick}
				>
					Buscar
				</button>
				<button
					className="btn btn-outline-primary my-2 mr-sm-4"
					onClick={newAssociado}
				>
					Novo associado
				</button>
			</form>
			<div className="box">{associado.loading && <Spinner />}</div>
		</>
	);
}
