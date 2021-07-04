import React from 'react';
import Table from 'react-bootstrap/Table';

import '../style.css';
import * as format from '../../../utils/helpers';
import ExportPdf from 'components/common/ExportPdf';

export default function AssociadoTable({ data, filtro }) {
	const {
		exibeMatricula,
		exibeDataFiliacao,
		exibeCpf,
		exibeEmpresa,
		exibeContatos,
		exibeEndereco
	} = filtro;

	let headers = [];
	headers.push('Nome');

	exibeMatricula && headers.push('Matricula');
	exibeCpf && headers.push('Cpf');
	exibeDataFiliacao && headers.push('Data de filiação');
	exibeEmpresa && headers.push('Empresa');
	exibeEndereco && headers.push('Endereço', 'Bairro');
	exibeContatos &&
		headers.push(
			'Celular1',
			'Celular2',
			'Fone Residencia',
			'Fone Trabalho',
			'Email'
		);

	//To Export
	const titleReport = () => {
		let status = '';
		let aposentado = '';
		if (filtro.aposentado !== undefined) {
			aposentado = filtro.aposentado ? '(Aposentados)' : '(Não aposentados)';
		}
		if (filtro.status) {
			status = filtro.status + 's ';
		}
		return 'Relatório de Associados ' + status + aposentado;
	};

	const dataToExport = data.map((item) => {
		let columns = {};
		if (item.matricula) columns.matricula = item.matricula;
		if (item.dados_pessoais) columns.cpf = item.dados_pessoais.cpf;
		if (item.dtfiliacao) columns.dtfiliacao = item.dtfiliacao;
		if (item.empresa) columns.sigla = item.empresa.sigla;
		if (item.endereco.logradouro) {
			columns.logradouro = item.endereco.logradouro;
			columns.bairro = item.endereco.bairro;
		}
		if (item.endereco.contatos) {
			columns.celular1 = item.endereco.contatos.celular1;
			columns.celular2 = item.endereco.contatos.celular2;
			columns.telefoneresidencia = item.endereco.contatos.telefoneresidencia;
			columns.telefonetrabalho = item.endereco.contatos.telefonetrabalho;
			columns.email = item.endereco.contatos.email;
		}

		return {
			nome: item.nome,
			...columns
		};
	});

	return (
		<div className="box-table">
			<Table variant="dark" size="sm" style={{ margin: '0 0 0 0' }}>
				<thead>
					<tr>
						<td>
							<ExportPdf
								orientation="landscape"
								title={titleReport()}
								subtitle=""
								headers={headers}
								data={dataToExport}
								columnRight={-1}
								fileName={'Relatorio-associado'}
							/>
						</td>
					</tr>
				</thead>
			</Table>
			<Table striped bordered hover variant="dark" size="sm" responsive>
				<thead>
					<tr>
						<th>#</th>
						{headers.map((item, idx) => {
							return <th key={idx}>{item}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{data.map((item, idx) => {
						return (
							<tr key={++idx}>
								<td>{idx}</td>
								<td>{format.capitalizeFullName(item.nome)}</td>
								{exibeMatricula && <td>{item?.matricula}</td>}
								{exibeCpf && <td>{item?.dados_pessoais?.cpf}</td>}
								{exibeDataFiliacao && (
									<td>{format.formatDateBr(item?.dtfiliacao)}</td>
								)}
								{exibeEmpresa && <td>{item?.empresa?.sigla}</td>}
								{exibeEndereco && (
									<>
										<td>{item.endereco?.logradouro}</td>
										<td>{item.endereco?.bairro}</td>
									</>
								)}
								{exibeContatos && (
									<>
										<td>{item.endereco?.contatos?.celular1}</td>
										<td>{item.endereco?.contatos?.celular2}</td>
										<td>{item.endereco?.contatos?.telefoneresidencia}</td>
										<td>{item.endereco?.contatos?.telefonetrabalho}</td>
										<td>{item.endereco?.contatos?.email}</td>
									</>
								)}
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
