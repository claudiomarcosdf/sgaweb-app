import React, { memo, useState, useContext } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { JumbotronWrapper } from './common';

import { useForm } from './useForm';
import { AuthContext } from 'context/AuthContext';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Spinner from './common/Spinner';

function Login() {
	let history = useHistory();
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		email: '',
		senha: ''
	});

	// Use Mutation ao invés de Query, pois no onChange chamava o hook 'login'
	const [login, { loading }] = useMutation(LOGIN, {
		update(_, result) {
			//or destructuring {data: {login: userData}}
			context.login(result.data.login);
			history.push('/app');
		},
		onError(err) {
			//Se o Path do servidor GraphQL não estiver correto
			// if (err.message === 'Failed to fetch') {
			// 	history.push('/connection-error');
			// }

			setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		login();
	}

	return (
		<JumbotronWrapper title="Login" description="" col={{ md: '6' }}>
			{loading && <Spinner />}
			<Form onSubmit={onSubmit} noValidate>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						name="email"
						type="email"
						placeholder="Entre com seu email"
						value={values.email}
						onChange={onChange}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Senha</Form.Label>
					<Form.Control
						name="senha"
						type="password"
						placeholder="Informe sua senha"
						value={values.senha}
						onChange={onChange}
					/>
				</Form.Group>

				{Object.keys(errors).length > 0 &&
					Object.values(errors).map((value) => (
						<Alert variant="danger" key={value}>
							<i className="fas fa-exclamation-triangle"></i> {value}
						</Alert>
					))}

				<div className="group-button">
					<Button
						variant="primary"
						type="submit"
						// disabled={!selected.length}
					>
						Entrar
					</Button>
					<div>
						<Link to="/forgot-password">Esqueceu a senha?</Link>
						&nbsp;&nbsp;&nbsp;
						<Link to="/register">Registrar</Link>
					</div>
				</div>
			</Form>
		</JumbotronWrapper>
	);
}

const LOGIN = gql`
	mutation login($email: String!, $senha: String!) {
		login(email: $email, senha: $senha) {
			id
			nome
			email
			perfis
			createdAt
			token
		}
	}
`;

export default memo(Login);
