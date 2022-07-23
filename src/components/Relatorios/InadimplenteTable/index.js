import React from 'react';
import Table from 'react-bootstrap/Table';

import '../style.css';
import * as format from '../../../utils/helpers';
import ExportPdf from 'components/common/ExportPdf';
import ExportExcel from 'components/common/ExportExcel';

export default function InadimplenteTable({ data, filtro }) {
	const headers = [
		'#',
		'Matrícula',
		'Nome',
		'CPF',
		'Empresa',
		'Celular1',
		'Celular2',
		'Fixo'
	];

	//To PDF export
	const dataToExport = data.map((item, idx) => {
		return {
			num: ++idx,
			matricula: item.matricula,
			nome: item.nome,
			cpf: item.cpf,
			empresa: item.empresa,
			celular1: item.celular1,
			celular2: item.celular2,
			fixo: item.fone1
		};
	});

	return (
		<div className="box-table">
			{console.log(data)}
			<Table variant="dark" size="sm" style={{ margin: '0 0 0 0' }}>
				<thead>
					<tr>
						<td>
							<ExportPdf
								orientation="landscape"
								title={`Relatório de inadimplentes ${filtro.mes}/${filtro.ano}`}
								subtitle=""
								headers={headers}
								data={dataToExport}
								columnRight={-1}
								fileName={`Relatorio-inadimplentes ${filtro.mes}-${filtro.ano}`}
							/>
							<ExportExcel
								headers={headers}
								data={dataToExport}
								fileName={`Relatorio-inadimplentes ${filtro.mes}-${filtro.ano}`}
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
								<td>{item?.matricula}</td>
								<td>{format.capitalizeFullName(item.nome)}</td>
								<td>{item?.cpf}</td>
								<td>{item?.empresa}</td>
								<td>{item?.celular1}</td>
								<td>{item?.celular2}</td>
								<td>{item?.fone1}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
