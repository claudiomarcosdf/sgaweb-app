import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORGAOS } from '../graphql/orgao';

const MyContext = React.createContext();

export default function OrgaoContextProvider({ children }) {
	const { data, loading, error } = useQuery(GET_ORGAOS);

	return (
		<>
			<MyContext.Provider
				value={{
					orgaos: {
						itens: data ? data.orgaos : [],
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

export function useOrgaoContext() {
	return useContext(MyContext);
}
