import { gql } from '@apollo/client';

export const GET_ASSOCIADOS = gql`
	query {
		associados {
			id
			nome
			matricula
			status
		}
	}
`;

export const GET_ASSOCIADO = gql`
	query getAssociado($matricula: String, $nome: String) {
		getAssociado(matricula: $matricula, nome: $nome) {
			id
			nome
			matricula
			matsindicato
			status
			dtfiliacao
			dados_pessoais {
				dtnascimento
				cpf
				rg
				sexo
				estadocivil
			}
			endereco {
				cep
				logradouro
				cidade
				bairro
				estado
				contatos {
					celular1
					celular2
					telefoneresidencia
					telefonetrabalho
					email
				}
			}
			empresa {
				sigla
				nome_empresa
				orgao
				funcao
				dtadmissao
				aposentado
			}
		}
	}
`;

export const ADD_ASSOCIADO = gql`
	mutation createAssociado(
		$matricula: String
		$nome: String
		$dtnascimento: Date
		$cpf: String
		$rg: String
		$sexo: String
		$estadocivil: String
		$cep: String
		$logradouro: String
		$cidade: String
		$bairro: String
		$estado: String
		$celular1: String
		$celular2: String
		$telefoneresidencia: String
		$telefonetrabalho: String
		$email: String
		$sigla: String
		$nome_empresa: String
		$orgao: String
		$funcao: String
		$dtadmissao: Date
		$aposentado: Boolean
	) {
		createAssociado(
			data: {
				matricula: $matricula
				nome: $nome
				dados_pessoais: {
					dtnascimento: $dtnascimento
					cpf: $cpf
					rg: $rg
					sexo: $sexo
					estadocivil: $estadocivil
				}
				endereco: {
					cep: $cep
					logradouro: $logradouro
					cidade: $cidade
					bairro: $bairro
					estado: $estado
					contatos: {
						celular1: $celular1
						celular2: $celular2
						telefoneresidencia: $telefoneresidencia
						telefonetrabalho: $telefonetrabalho
						email: $email
					}
				}
				empresa: {
					sigla: $sigla
					nome_empresa: $nome_empresa
					orgao: $orgao
					funcao: $funcao
					dtadmissao: $dtadmissao
					aposentado: $aposentado
				}
			}
		) {
			id
			nome
			matricula
			matsindicato
			status
			dtfiliacao
			dados_pessoais {
				dtnascimento
				cpf
				rg
				sexo
				estadocivil
			}
			endereco {
				cep
				logradouro
				cidade
				bairro
				estado
				contatos {
					celular1
					celular2
					telefoneresidencia
					telefonetrabalho
					email
				}
			}
			empresa {
				sigla
				nome_empresa
				orgao
				funcao
				dtadmissao
				aposentado
			}
		}
	}
`;

export const EDIT_ASSOCIADO = gql`
	mutation updateAssociado(
		$id: String
		$nome: String
		$matricula: String
		$status: Status
		$dtnascimento: Date
		$cpf: String
		$rg: String
		$sexo: String
		$estadocivil: String
		$cep: String
		$logradouro: String
		$cidade: String
		$bairro: String
		$estado: String
		$celular1: String
		$celular2: String
		$telefoneresidencia: String
		$telefonetrabalho: String
		$email: String
		$sigla: String
		$nome_empresa: String
		$orgao: String
		$funcao: String
		$dtadmissao: Date
		$aposentado: Boolean
	) {
		updateAssociado(
			id: $id
			data: {
				nome: $nome
				matricula: $matricula
				status: $status
				dados_pessoais: {
					dtnascimento: $dtnascimento
					cpf: $cpf
					rg: $rg
					sexo: $sexo
					estadocivil: $estadocivil
				}
				endereco: {
					cep: $cep
					logradouro: $logradouro
					cidade: $cidade
					bairro: $bairro
					estado: $estado
					contatos: {
						celular1: $celular1
						celular2: $celular2
						telefoneresidencia: $telefoneresidencia
						telefonetrabalho: $telefonetrabalho
						email: $email
					}
				}
				empresa: {
					sigla: $sigla
					nome_empresa: $nome_empresa
					orgao: $orgao
					funcao: $funcao
					dtadmissao: $dtadmissao
					aposentado: $aposentado
				}
			}
		) {
			id
			nome
			matricula
			matsindicato
			status
			dtfiliacao
			dados_pessoais {
				dtnascimento
				cpf
				rg
				sexo
				estadocivil
			}
			endereco {
				cep
				logradouro
				cidade
				bairro
				estado
				contatos {
					celular1
					celular2
					telefoneresidencia
					telefonetrabalho
					email
				}
			}
			empresa {
				sigla
				nome_empresa
				orgao
				funcao
				dtadmissao
				aposentado
			}
		}
	}
`;
