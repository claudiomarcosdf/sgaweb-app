import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import * as format from '../../../utils/helpers';
import ExportPdf from 'components/common/ExportPdf';
import ExportExcel from 'components/common/ExportExcel';

export default function List({ registers, filtro }) {
	const [doc, setDoc] = useState({});

	let headers = ['Matrícula', 'Nome', 'Cpf', 'Valor'];
	const { exibirOrgao, exibirRubrica } = filtro;
	exibirRubrica && headers.unshift('Rubrica');
	exibirOrgao && headers.unshift('Orgão');

	const registersSorted = registers
		.slice()
		.sort((a, b) => a.nome.localeCompare(b.nome));

	const customDoc = () => {
		const dataToPdf = registersSorted.map((item) => {
			let columns = {};
			if (item.orgao) columns.orgao = item.orgao;
			if (item.rubrica) columns.rubrica = item.rubrica;

			return {
				...columns,
				matricula: item.matricula,
				nome: format.capitalizeFullName(item.nome),
				cpf: format.formatCpfToView(item.cpf),
				valor: format.formatBrazil(item.valor)
			};
		});

		const amount = format.formatBrazil(
			registers.reduce((acc, curr) => {
				return acc + curr.valor;
			}, 0)
		);
		const monthYear = (char) =>
			registersSorted[0].mes + char + registersSorted[0].ano;

		setDoc({
			title: 'Relatório de arrecadação - período: ' + monthYear('/'),
			subtitle: 'Total arrecadado: R$ ' + amount,
			fileName: 'Arrecadacao-' + monthYear('-'),
			dataToPdf
		});
	};

	useEffect(() => {
		customDoc();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Table variant="dark" size="sm" style={{ margin: '0 0 0 0' }}>
				<thead>
					<tr>
						<td>
							<ExportPdf
								orientation="portrait"
								// orientation="landscape"
								title={doc.title}
								subtitle={doc.subtitle}
								headers={headers}
								data={doc.dataToPdf}
								columnRight={headers.length}
								fileName={doc.fileName}
							/>
							<ExportExcel
								headers={headers}
								data={doc.dataToPdf}
								fileName={doc.fileName}
							/>
						</td>
					</tr>
				</thead>
			</Table>
			<Table striped bordered hover variant="dark" size="sm">
				<thead>
					<tr>
						<th>#</th>
						{registersSorted[0].orgao && <th>Órgão</th>}
						{registersSorted[0].rubrica && <th>Rubrica</th>}
						<th>Matricula</th>
						<th>Nome</th>
						<th>Cpf</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					{registersSorted.map((item, idx) => {
						return (
							<tr key={++idx}>
								<td>{idx}</td>
								{item.orgao && <td>{item.orgao}</td>}
								{item.rubrica && <td>{item.rubrica}</td>}
								<td>{item.matricula}</td>
								<td>{format.capitalizeFullName(item.nome)}</td>
								<td>{format.formatCpfToView(item.cpf)}</td>
								<td className="text-right">
									{format.formatBrazil(item.valor)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}
