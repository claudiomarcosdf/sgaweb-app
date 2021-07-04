import React, { memo, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { JumbotronWrapper } from './common';
import { useForm } from './useForm';
import Spinner from './common/Spinner';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
	let history = useHistory();
	const query = useQuery();
	const code = query.get('code') || '';
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	const { onChange, onSubmit, values } = useForm(resetPasswordCallback, {
		newPassword: '',
		confirmPassword: ''
	});

	function beforeSubmit(e) {
		e.preventDefault();

		if (values.newPassword === values.confirmPassword) {
			onSubmit(e);
		} else {
			setErrors({ confirmPassword: 'As senhas não conferem.' });
		}
	}

	function goToLogin() {
		setTimeout(() => {
			history.push('/login');
		}, 3000);
	}

	const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
		variables: {
			newPassword: values.newPassword,
			codeToken: code
		},
		update(_, result) {
			setSuccess(true);
			goToLogin();
		},
		onError(err) {
			if (err?.message) {
				setErrors({ message: err.message });
			} else {
				setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
			}
		}
	});

	function resetPasswordCallback() {
		resetPassword();
	}

	return (
		<JumbotronWrapper title="Recuperar senha" description="" col={{ md: '6' }}>
			{loading && <Spinner />}
			<Form onSubmit={beforeSubmit} noValidate>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Nova senha</Form.Label>
					<Form.Control
						name="newPassword"
						type="password"
						placeholder="Informe a senha"
						value={values.newPassword}
						onChange={onChange}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicConfirmPassword">
					<Form.Label>Confirmar Senha</Form.Label>
					<Form.Control
						name="confirmPassword"
						type="password"
						placeholder="Confirme a senha"
						value={values.confirmPassword}
						onChange={onChange}
					/>
				</Form.Group>

				{Object.keys(errors).length > 0 &&
					Object.values(errors).map((value) => (
						<Alert variant="danger" key={value}>
							<i className="fas fa-exclamation-triangle"></i> {value}
						</Alert>
					))}

				<div className="button-full-size">
					<Button variant="primary" type="submit">
						Resetar senha
					</Button>
				</div>

				{success && (
					<div className="success-msg-simple">
						<i className="fas fa-info-circle">
							&nbsp; Sua senha foi alterada com sucesso!
						</i>
					</div>
				)}
			</Form>
		</JumbotronWrapper>
	);
}

const RESET_PASSWORD = gql`
	mutation resetPassword($codeToken: String!, $newPassword: String!) {
		resetPassword(codeToken: $codeToken, newPassword: $newPassword)
	}
`;

export default memo(ResetPassword);
