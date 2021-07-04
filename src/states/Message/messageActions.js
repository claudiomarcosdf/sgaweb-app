import { toast } from 'react-toastify';

const SET_MESSAGE = 'SET_MESSAGE';

const showMessage = (messageType, message) => {
	if (messageType === 'success') {
		toast.success(message);
	} else if (messageType === 'warning') {
		toast.warning(message);
	} else {
		toast.error(message);
	}
};

const getErrors = (errors) => {
	if (errors.networkError) {
		let message = 'Erro na rede.';
		const erro = errors.networkError.toString();
		if (erro.match(/fetch/)) {
			message = 'Servidor inoperante.';
		}
		if (erro.match(/code 400/)) {
			message = 'Campo obrigatório inválido ou não preenchido.';
		}

		showMessage('error', message);
	} else {
		errors.graphQLErrors.map(({ message }, i) => showMessage('error', message));
	}
};

export const setMessage = (message) => {
	if (message.error) getErrors(message.error);
	if (message.success) showMessage('success', message.messageSuccess);
	if (message.warning) showMessage('warning', message.messageWarning);

	return {
		type: SET_MESSAGE,
		payload: message
	};
};
