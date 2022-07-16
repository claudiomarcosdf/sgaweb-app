import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';

const httpLink = createUploadLink({
	uri: process.env.REACT_APP_URL_GRAPHQL
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Apollo-Require-Preflight': true
		}
	};
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) goToServerPageError();
});

const goToServerPageError = () => {
	const baseDir = window ? window.location.origin.toString() : '';

	if (typeof window !== 'undefined') {
		window.location.href = baseDir + '/connection-error';
		//window.location.href = window.location.href + 'connection-error';
	}
};

export const client = new ApolloClient({
	//@ts-ignore
	link: from([errorLink, authLink, httpLink]),

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
