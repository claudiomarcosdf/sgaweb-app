import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

const httpLink = createUploadLink({
	uri: process.env.REACT_APP_URL_GRAPHQL
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	};
});

export const client = new ApolloClient({
	//@ts-ignore
	link: authLink.concat(httpLink),

	cache: new InMemoryCache()
});

// PARA ATUALIZAR O CACHE CASO O MESMO ESTIVER DIFERENTE DOS DADOS DO BACKEND

// cache: new InMemoryCache({
// 	typePolicies: {
// 		Query: {
// 			fields: {
// 				associados: {
// 					merge(_, incoming) { //incoming são os dados da resposta do backend
// 						return incoming;
// 					}
// 				}
// 			}
// 		}
// 	}
// });
