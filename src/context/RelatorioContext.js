import React, { createContext, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';

import { RELATORIO_ASSOCIADO } from '../graphql/relatorio/associado';

const MyContext = createContext();

export default function RelatorioContextProvider({ children }) {
	const [filter, { data, loading, error }] = useLazyQuery(RELATORIO_ASSOCIADO);

	// const { data: dataup, loading: load, error: err } = useQuery(RELATORIO);

	return (
		<>
			<MyContext.Provider
				value={{
					associados: {
						filter,
						items: data ? data.associadosFiltro : [],
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
