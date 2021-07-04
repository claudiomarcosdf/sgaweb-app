/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
	GET_ASSOCIADOS,
	ADD_ASSOCIADO,
	GET_ASSOCIADO,
	EDIT_ASSOCIADO
} from '../graphql/associado';
import NewAssociado from 'components/Associado/newAssociado';
import { unformatJSON } from '../utils/unformatJSON';

import { setMessage } from 'states/Message/messageActions';
const MyContext = React.createContext();

export default function AssociadoContextProvider({ children }) {
	const msgDefault = {
		error: false,
		success: false,
		warning: false,
		messageSuccess: '',
		messageWarning: ''
	};
	const [inputs, setInputs] = useState(NewAssociado);
	const dispatch = useDispatch();

	const { data: allAssociados, loading: loadingAssociados } = useQuery(
		GET_ASSOCIADOS
	);

	const [
		findBy,
		{ data: associadoData, loading: loadingAssociado }
	] = useLazyQuery(GET_ASSOCIADO, {
		onCompleted: ({ getAssociado: associado }) =>
			callFindMessage(associado, null),
		onError: (error) => callFindMessage(null, error)
	});

	const [createAssociado, { loading: loadingCreate }] = useMutation(
		ADD_ASSOCIADO,
		{
			onCompleted: ({ createAssociado: associado }) =>
				callMessage(associado, null, 'Associado salvo com sucesso.'),
			onError: (error) => callMessage(null, error, '')
		}
	);

	const [updateAssociado, { loading: loadingUpdate }] = useMutation(
		EDIT_ASSOCIADO,
		{
			onCompleted: ({ updateAssociado: associado }) =>
				callMessage(associado, null, 'Associado atualizado com sucesso.'),
			onError: (error) => callMessage(null, error, '')
		}
	);

	const callMessage = (data, error, messageSuccess) => {
		if (data) {
			setInputs(data);
			dispatch(
				setMessage({
					...msgDefault,
					success: true,
					messageSuccess
				})
			);
		} else if (error) {
			dispatch(
				setMessage({
					...msgDefault,
					error
				})
			);
		}
	};

	const callFindMessage = (data, error) => {
		if (data) {
			//Se não estiver nulo
			//NESSE CASO TENHO QUE TRATAR, POIS RETORNA UM OBJETO NO FORMATO JSON
			setInputs(unformatJSON(data)); //retorno da consulta
		} else if (!data) {
			setInputs(NewAssociado);
			dispatch(
				setMessage({
					...msgDefault,
					warning: true,
					messageWarning: 'Associado não encontrado.'
				})
			);
		} else if (error) {
			dispatch(
				setMessage({
					...msgDefault,
					error
				})
			);
		}
	};

	return (
		<>
			<MyContext.Provider
				value={{
					associados: {
						items: allAssociados ? allAssociados.associados : [],
						loadingAssociados
					},
					associado: {
						findBy,
						data: associadoData?.getAssociado,
						loading: loadingAssociado,
						createAssociado,
						loadingCreate,
						updateAssociado,
						loadingUpdate
					},
					inputs,
					setInputs
				}}
			>
				{children}
			</MyContext.Provider>
		</>
	);
}

export function useAssociadoContext() {
	return useContext(MyContext);
}