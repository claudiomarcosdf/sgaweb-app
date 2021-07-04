import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Routes from 'routes';

import { client } from './config/client-graphql';
import { ApolloProvider } from '@apollo/client';

import MessageConfig from 'components/common/MessageConfig';
import { AllContextProviders } from 'context';

function App() {
	return (
		<ApolloProvider client={client}>
			<MessageConfig />
			<Container fluid>
				<Row>
					<Col className="p-0">
						<AllContextProviders>
							<Routes />
						</AllContextProviders>
					</Col>
				</Row>
			</Container>
		</ApolloProvider>
	);
}

export default App;
