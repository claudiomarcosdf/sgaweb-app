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
	const [success, setSuccess] = useState('');
	const { onChange, onSubmit, values } = useForm(sendEmailCallback, {
		email: ''
	});

	const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD, {
		variables: values,
		update(_, result) {
			if (result.data.forgotPassword) {
				setSuccess('success');
			} else {
				setSuccess('fail');
			}
		},
		onError(error) {
			setErrors(error.graphQLErrors[0]?.extensions.exception.errors);
		}
	});

	function sendEmailCallback() {
		forgotPassword();
	}

	function responseMessage() {
		if (success === 'success') {
			return (
				<div className="simple-msg">
					<i className="fas fa-info-circle success-simple-msg">
						&nbsp; O link para resetar sua senha foi enviado com sucesso!
					</i>
				</div>
			);
		}
		if (success === 'fail') {
			return (
				<div className="simple-msg">
					<i className="fas fa-info-circle fail-simple-msg">
						&nbsp; Falha ao enviar link de recuperação de senha!
					</i>
				</div>
			);
		}
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
					Object.values(errors).map((value, idx) => (
						<Alert variant="danger" key={idx}>
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

				{responseMessage()}
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
