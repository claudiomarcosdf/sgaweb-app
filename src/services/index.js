import axios from 'axios';

const viaCep = 'https://viacep.com.br/ws';

async function findCep(_cep) {
	const cep = _cep.replace('.', '').replace('-', '');

	const response = await axios.get(`${viaCep}/${cep}/json`);

	if (response.data.erro) {
		throw Error(response.Error);
	}
	return response;
}

export { findCep };
