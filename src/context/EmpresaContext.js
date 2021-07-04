import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EMPRESAS } from '../graphql/empresa';

const MyContext = React.createContext();

export default function EmpresaContextProvider({ children }) {
	const { data, loading, error } = useQuery(GET_EMPRESAS);

	return (
		<>
			<MyContext.Provider
				value={{
					empresas: {
						itens: data ? data.empresas : [],
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

export function useEmpresaContext() {
	return useContext(MyContext);
}
