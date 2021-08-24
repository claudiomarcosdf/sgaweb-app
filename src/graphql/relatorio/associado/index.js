import { gql } from '@apollo/client';

export const RELATORIO_ASSOCIADO = gql`
	query associadosFiltro(
		$status: String
		$empresa_sigla: String
		$aposentado: Boolean
		$exibeMatricula: Boolean!
		$exibeDataFiliacao: Boolean!
		$exibeCpf: Boolean!
		$exibeDataNascimento: Boolean!
		$exibeSexo: Boolean!
		$exibeEmpresa: Boolean!
		$exibeContatos: Boolean!
		$exibeEndereco: Boolean!
	) {
		associadosFiltro(
			filtro: {
				status: $status
				empresa_sigla: $empresa_sigla
				aposentado: $aposentado
			}
		) {
			nome
			matricula @include(if: $exibeMatricula)
			dtfiliacao @include(if: $exibeDataFiliacao)
			dados_pessoais {
				cpf @include(if: $exibeCpf)
				dtnascimento @include(if: $exibeDataNascimento)
				sexo @include(if: $exibeSexo)
			}
			empresa @include(if: $exibeEmpresa) {
				sigla
			}
			endereco {
				logradouro @include(if: $exibeEndereco)
				bairro @include(if: $exibeEndereco)
				contatos @include(if: $exibeContatos) {
					celular1
					celular2
					telefoneresidencia
					telefonetrabalho
					email
				}
			}
		}
	}
`;

export const RELATORIO = gql`
	query {
		associados {
			nome
			matricula
			dados_pessoais {
				cpf
			}
		}
	}
`;
