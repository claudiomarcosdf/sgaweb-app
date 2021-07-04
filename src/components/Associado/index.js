import React, { memo, useState, useContext } from 'react';
import { JumbotronWrapper } from '../common';

import { useAssociadoContext } from 'context/AssociadoContext';
import FindAndNew from 'components/Associado/FindAndNew';
import AbasAssociado from 'components/Associado/AbasAssociado';

import './style.css';
import Spinner from 'components/common/Spinner';
import NewAssociado from './newAssociado';

const ContextForm = React.createContext();

function Associado() {
	const [disableForm, setDisableForm] = useState(true);
	const { associado, inputs, setInputs } = useAssociadoContext();

	const cancelClick = () => {
		//Remove Cache
		associado.findBy({
			update(cache, data) {
				cache.evict({ id: 'GET_ASSOCIADO' });
			}
		});
		setDisableForm(true);

		setInputs(NewAssociado); //verificar
	};

	const saveClick = () => {
		if (inputs?.id) {
			associado.updateAssociado({
				variables: inputs
			});
		} else {
			associado.createAssociado({
				variables: inputs
			});
		}
	};

	const actionsButtons = () => {
		return (
			<div className="space-top ">
				<button
					className="btn btn-primary my-2 mr-sm-2"
					disabled={disableForm}
					onClick={saveClick}
				>
					Salvar
				</button>
				<button
					className="btn btn-ligth my-2 my-sm-0"
					disabled={disableForm}
					onClick={cancelClick}
				>
					Cancelar
				</button>
				{associado.loadingCreate && <Spinner />}
			</div>
		);
	};

	return (
		<>
			<ContextForm.Provider
				value={{
					form: {
						disableForm,
						setDisableForm,
						inputs,
						setInputs
					}
				}}
			>
				<JumbotronWrapper title="Associado">
					<h6 className="label-color">Consulta associado</h6>
					<FindAndNew />
					<AbasAssociado />
					{actionsButtons()}
				</JumbotronWrapper>
			</ContextForm.Provider>
		</>
	);
}

export function useContextForm() {
	return useContext(ContextForm);
}

export default memo(Associado);
