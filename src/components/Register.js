import React, { memo, useContext, useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { JumbotronWrapper } from './common';

import { AuthContext } from '../context/AuthContext';
import { useForm } from './useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Spinner from './common/Spinner';

function Register() {
	let history = useHistory();
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(registerUserCallback, {
		nome: '',
		email: '',
		senha: '',
		confirmaSenha: ''
	});

	const [registrar, { loading }] = useMutation(REGISTER_USER, {
		//destructuring
		update(_, { data: { register: userData } }) {
			context.login(userData);
			history.push('/app');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function registerUserCallback() {
		registrar();
	}

	return (
		<JumbotronWrapper title="Registrar novo usuário" col={{ md: '6' }}>
			{loading && <Spinner />}
			<Form onSubmit={onSubmit} noValidate>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Nome</Form.Label>
					<Form.Control
						name="nome"
						type="text"
						placeholder="Informe seu nome de usuário"
						value={values.nome}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						name="email"
						type="email"
						placeholder="Informe seu email"
						value={values.email}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Senha</Form.Label>
					<Form.Control
						name="senha"
						type="password"
						placeholder="Informe a senha"
						value={values.senha}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Confirmar Senha</Form.Label>
					<Form.Control
						name="confirmaSenha"
						type="password"
						placeholder="Confirme a senha"
						value={values.confirmaSenha}
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
					<Button variables="primary" type="submit">
						Registrar
					</Button>
					<Link to="/login">Voltar ao login</Link>
				</div>
			</Form>
		</JumbotronWrapper>
	);
}

const REGISTER_USER = gql`
	mutation register(
		$nome: String!
		$email: String!
		$senha: String!
		$confirmaSenha: String!
	) {
		register(
			dados: {
				nome: $nome
				email: $email
				senha: $senha
				confirmaSenha: $confirmaSenha
			}
		) {
			id
			nome
			email
			token
			createdAt
			perfis
		}
	}
`;

export default memo(Register);
