import React, { memo, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { JumbotronWrapper } from './common';
import { useForm } from './useForm';
import Spinner from './common/Spinner';

function ForgotPassword() {
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const { onChange, onSubmit, values } = useForm(sendEmailCallback, {
		email: ''
	});

	const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD, {
		variables: values,
		update(_, result) {
			setSuccess(true);
		},
		onError(err) {
			setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
		}
	});

	function sendEmailCallback() {
		forgotPassword();
	}

	return (
		<JumbotronWrapper title="Recuperar senha" description="" col={{ md: '6' }}>
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

				{Object.keys(errors).length > 0 &&
					Object.values(errors).map((value) => (
						<Alert variant="danger" key={value}>
							<i className="fas fa-exclamation-triangle"></i> {value}
						</Alert>
					))}

				<div className="group-button">
					<Button variant="primary" type="submit">
						Enviar email de recuperação de senha
					</Button>
					<div>
						<Link to="/login">Voltar ao login</Link>
					</div>
				</div>

				{success && (
					<div className="success-msg-simple">
						<i className="fas fa-info-circle">
							&nbsp; O link para resetar sua senha foi enviado com sucesso!
						</i>
					</div>
				)}
			</Form>
		</JumbotronWrapper>
	);
}

const FORGOT_PASSWORD = gql`
	mutation forgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;

export default memo(ForgotPassword);
