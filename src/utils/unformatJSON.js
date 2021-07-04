function unformatJSON(value) {
	const loadedValues = {
		id: value.id || '',
		status: value.status || '',
		dtfiliacao: value.dtfiliacao || '',
		matricula: value.matricula || '',
		matsindicato: value.matsindicato || '',
		nome: value.nome || '',
		dtnascimento: value.dados_pessoais.dtnascimento || '',
		cpf: value.dados_pessoais.cpf || '',
		rg: value.dados_pessoais.rg || '',
		sexo: value.dados_pessoais.sexo || '',
		estadocivil: value.dados_pessoais.estadocivil || '',
		cep: value.endereco.cep || '',
		logradouro: value.endereco.logradouro || '',
		cidade: value.endereco.cidade || '',
		bairro: value.endereco.bairro || '',
		estado: value.endereco.estado || '',
		celular1: value.endereco.contatos.celular1 || '',
		celular2: value.endereco.contatos.celular2 || '',
		telefoneresidencia: value.endereco.contatos.telefoneresidencia || '',
		telefonetrabalho: value.endereco.contatos.telefonetrabalho || '',
		email: value.endereco.contatos.email || '',
		funcao: value.empresa.funcao || '',
		nome_empresa: value.empresa.nome_empresa || '',
		sigla: value.empresa.sigla || '',
		orgao: value.empresa.orgao || '',
		dtadmissao: value.empresa.dtadmissao || '',
		aposentado: value.empresa.aposentado
	};

	return loadedValues;
}

export { unformatJSON };
