import React from 'react';
import { Button } from 'react-bootstrap';
import ReactExport from 'react-data-export';

import './style.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function ExportExcel({ headers, data, fileName }) {
	const columnsTitle = headers.map((title, idx) => {
		return {
			title,
			style: {
				font: { sz: '11', bold: true },
				fill: { fgColor: { rgb: 'FFDAB9' } }
			},
			width: idx === 0 ? { wpx: 350 } : { wpx: 95 }
		};
	});

	let dataTable = [];

	if (data) {
		dataTable = Object.keys(data).reduce((arr, e) => {
			arr.push(
				Object.values(data[e]).map((line) => {
					return {
						value: line || '',
						style: { font: { sz: '11' } }
					};
				})
			);

			return arr;
		}, []);
	}

	const customDataSet = [
		{
			columns: columnsTitle,
			data: dataTable
		}
	];

	function button() {
		return (
			<>
				<Button
					variant="success"
					style={{ color: '#ffff', fontSize: '0.8rem' }}
				>
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
