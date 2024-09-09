import { gql } from '@apollo/client';

export const GET_ORGAOS = gql`
	query {
		orgaos {
			codigo
			sigla
			nome
		}
	}
`;
