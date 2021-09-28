import React from 'react';
import { Button } from 'react-bootstrap';
import ReactExport from 'react-export-excel';

import { capitalize } from '../../../utils/helpers';
import './style.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExportExcel({ headers, data, fileName }) {
	// let columnsTable = [];
	//*** NÃO DEU CERTO QD O OBJETO NÃO POSSUI O CAMPO */
	// Object.entries(data[0]).forEach(([key]) => {
	// 	columnsTable.push(capitalize(key));
	// });

	const dataTable = data.map((obj) => {
		return Object.values(obj);
	});

	const customDataSet = [
		{
			columns: headers,
			data: dataTable
		}
	];

	//*** FORMATO Q FUNCIONA  */
	// const customDataSet = [
	// 	{
	// 		columns: ['Name', 'Salary', 'Sex'],
	// 		data: [
	// 			['Monika', 355000, 'Female'],
	// 			['Konstantina', 20000, 'Female'],
	// 			['John', 250000, 'Male'],
	// 			['Josef', 450500, 'Male']
	// 		]
	// 	}
	// ];

	function button() {
		return (
			<>
				<Button variant="link" style={{ color: '#80ffdb', fontSize: '0.8rem' }}>
					Salvar em excel <i className="far fa-file-excel icon-space"></i>
				</Button>
			</>
		);
	}

	return (
		<>
			<ExcelFile element={button()} filename={fileName}>
				<ExcelSheet dataSet={customDataSet} name="Associados" />
			</ExcelFile>
		</>
	);
}
