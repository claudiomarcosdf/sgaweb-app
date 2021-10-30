import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

import { Button } from 'react-bootstrap';
import _ from 'lodash';

import './style.css';

// const styleButton = {
// 	color: '#ffff',
// 	fontSize: '0.9rem',
// 	width: '142px',
// 	padding: '1px 1px'
// };

export default function ExportPdf({
	orientation,
	title,
	subtitle,
	headers,
	data,
	fileName,
	columnRight
}) {
	const exportPDF = () => {
		const unit = 'pt';
		const size = 'A4';
		const marginLeft = 40;
		const today = 'Consulta em ' + moment().format('DD/MM/YYYY HH:mm:ss');

		const doc = new jsPDF(orientation, unit, size);
		doc.setFontSize(12);

		const dataArray = Object.keys(data).reduce((arr, e) => {
			// Retira com omit o __typename se houver
			arr.push(Object.values(_.omit(data[e], '__typename')));
			return arr;
		}, []);

		let content = {
			startY: 65,
			pageBreak: 'auto',
			showFoot: 'everyPage',
			columnStyles: { [columnRight]: { halign: 'right' } },
			head: [headers],
			body: dataArray
		};

		const width = doc.internal.pageSize.getWidth();
		const heigth = doc.internal.pageSize.getHeight();
		doc.page = 1;
		doc.text(title, marginLeft, 40);
		doc.setFontSize(10);
		doc.text(subtitle, marginLeft, 55);
		doc.setFontSize(8);
		doc.setFont('arial', 'italic');
		doc.text(today, width - today.length - 10, 60, {
			align: 'right'
		});
		doc.setFontSize(12);
		doc.autoTable(content);
		doc.setTextColor(100);
		doc.setFontSize(10);

		//footer

		doc.text(
			'Total de páginas ' + doc.internal.getNumberOfPages(),
			width / 2,
			heigth - 15,
			{
				align: 'center'
			}
		);
		doc.save(fileName);
	};

	return (
		<>
			<Button
				// variant="link"
				variant="danger"
				onClick={() => exportPDF()}
				// style={{ color: '#80ffdb', fontSize: '0.8rem' }}
				className="button"
			>
				Salvar em pdf <i className="far fa-file-pdf icon-space"></i>
			</Button>
		</>
	);
}
