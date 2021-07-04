import { gql } from '@apollo/client';

export const IMPORT = gql`
	mutation uploadFile($file: Upload!) {
		uploadFile(file: $file) {
			filename
			mimetype
		}
	}
`;

export const RECEBIDOS = gql`
	query recebidos($ano: String, $mes: String, $rubrica: String) {
		recebidos(ano: $ano, mes: $mes, rubrica: $rubrica)
	}
`;

//Recebimentos

export const FILTRO_CONSULTA = gql`
	query recebimentoFiltro(
		$ano: String
		$mes: String
		$orgao: String
		$rubrica: String
		$matricula: String
		$exibirOrgao: Boolean!
		$exibirRubrica: Boolean!
	) {
		recebimentoFiltro(
			filtro: {
				ano: $ano
				mes: $mes
				orgao: $orgao
				rubrica: $rubrica
				matricula: $matricula
			}
		) {
			rubrica @include(if: $exibirRubrica)
			orgao @include(if: $exibirOrgao)
			ano
			mes
			matricula
			nome
			cpf
			valor
		}
	}
`;

export const FILTRO_GRAFICO = gql`
	query totaisMensais($ano: String) {
		totaisMensais(ano: $ano)
	}
`;
