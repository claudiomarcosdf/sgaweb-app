import { gql } from '@apollo/client';

export const GET_ORGAOS = gql`
	query {
		orgaos {
			nome
		}
	}
`;
