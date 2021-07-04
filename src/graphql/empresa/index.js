import { gql } from '@apollo/client';

export const GET_EMPRESAS = gql`
	query {
		empresas {
			sigla
			nome
		}
	}
`;
