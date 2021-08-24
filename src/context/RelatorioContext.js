import React, { createContext, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';

import { RELATORIO_ASSOCIADO } from '../graphql/relatorio/associado';

const MyContext = createContext();

export default function RelatorioContextProvider({ children }) {
	const [filter, { data, loading, error }] = useLazyQuery(RELATORIO_ASSOCIADO);

	// const { data: dataup, loading: load, error: err } = useQuery(RELATORIO);

	//Como o array está congelada no modo estrito,
	//você precisará copiar o array "slice()"
	//antes de classificá-la
	function orderBy(data) {
		const copyData = [...data.associadosFiltro];
		const dataSorted = copyData.sort(function(a, b) {
			const nomeA = a.nome.toUpperCase();
			const nomeB = b.nome.toUpperCase();
			if (nomeA < nomeB) return -1;
			if (nomeA > nomeB) return 1;

			return 0;
		});

		return dataSorted;
	}

	return (
		<>
			<MyContext.Provider
				value={{
					associados: {
						filter,
						items: data ? orderBy(data) : [],
						loading,
						error
					}
				}}
			>
				{children}
			</MyContext.Provider>
		</>
	);
}

export function useRelatorioContext() {
	return useContext(MyContext);
}
