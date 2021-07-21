import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
	IMPORT,
	RECEBIDOS,
	FILTRO_CONSULTA,
	FILTRO_GRAFICO,
	FILTRO_GRAFICO_POR_EMPRESA
} from '../graphql/recebimento';
import { setMessage } from 'states/Message/messageActions';

const FileContext = React.createContext();

export default function RecebimentoContextProvider({ children }) {
	// const currentYear = moment().format('YYYY');
	const dispatch = useDispatch();
	const msgDefault = {
		error: false,
		success: false,
		warning: false,
		messageSuccess: '',
		messageWarning: ''
	};

	//Importação
	const [verify, { data, loading, error }] = useLazyQuery(RECEBIDOS, {
		fetchPolicy: 'no-cache',
		onCompleted: ({ recebidos }) => verifyMessage(recebidos, null)
	});
	const [
		upload,
		{ data: response, error: errorUpload, loading: loadingUpload }
	] = useMutation(IMPORT, {
		fetchPolicy: 'no-cache',
		onCompleted: ({ uploadFile }) => uploadMessage(uploadFile, null),
		onError: (error) => uploadMessage(null, error)
	});

	//Recebimentos
	const [filter, { data: dataFilter, loading: loadingFilter }] = useLazyQuery(
		FILTRO_CONSULTA,
		{
			fetchPolicy: 'network-only',
			onError: (error) => filterMessage(error)
		}
	);

	//Graficos
	const [
		getDataChart,
		{ data: dataTotais, error: errorTotais, loading: loadingTotais }
	] = useLazyQuery(FILTRO_GRAFICO, { fetchPolicy: 'no-cache' });

	const [
		getDataChartPorEmpresa,
		{
			data: dataTotalEmpresa,
			error: errorTotalEmpresa,
			loading: loadingTotalEmpresa
		}
	] = useLazyQuery(FILTRO_GRAFICO_POR_EMPRESA, { fetchPolicy: 'no-cache' });

	const verifyMessage = (data) => {
		if (data) {
			dispatch(
				setMessage({
					...msgDefault,
					warning: true,
					messageWarning: 'Arquivo já importado para esse período.'
				})
			);
		}
	};

	const uploadMessage = (data, error) => {
		if (data) {
			dispatch(
				setMessage({
					...msgDefault,
					success: true,
					messageSuccess: 'Arquivo importado com sucesso.'
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

	const filterMessage = (error) => {
		if (error) {
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
			<FileContext.Provider
				value={{
					recebimento: {
						verify,
						recebidos: data ? data.recebidos : false, //true or false
						loading,
						error
					},
					file: {
						upload,
						dataFile: response ? response.uploadFile : '',
						errorUpload,
						loadingUpload
					},
					consulta: {
						filter,
						dataFilter: dataFilter ? dataFilter.recebimentoFiltro : [],
						loadingFilter
					},
					grafico: {
						getDataChart,
						totais: dataTotais ? dataTotais.totaisMensais : [],
						errorTotais,
						loadingTotais,

						getDataChartPorEmpresa,
						totalPorEmpresa: dataTotalEmpresa
							? dataTotalEmpresa.totalMensalPorEmpresa
							: [],
						errorTotalEmpresa,
						loadingTotalEmpresa
					}
				}}
			>
				{children}
			</FileContext.Provider>
		</>
	);
}

export function useRecebimentoContext() {
	return useContext(FileContext);
}
