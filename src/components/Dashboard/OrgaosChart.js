/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { Line } from 'react-chartjs-2';

import { useRecebimentoContext } from '../../context/RecebimentoContext';
import Spinner from '../common/Spinner';
import moment from 'moment';

export default function OrgaosChart() {
	const anoAtual = moment().format('YYYY');
	const mesAtual = moment().format('MM');

	moment.locale('pt');

	moment.updateLocale('pt', {
		months: [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		]
	});

	const currentMonth = moment().format('MMMM');
	const { grafico } = useRecebimentoContext();

	useEffect(() => {
		grafico.getDataChartPorEmpresa({
			variables: { ano: anoAtual, mes: mesAtual }
		});
	}, []);

	const showChart = () => {
		const data = {
			labels: grafico.totalPorEmpresa.map(({ orgao }) => orgao),
			datasets: [
				{
					label:
						'Arrecadação por empresa | mês ' + currentMonth + '/' + anoAtual,
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 2,
					hoverBackgroundColor: 'rgba(75, 192, 192, 0.2)',
					hoverBorderColor: 'rgba(75, 192, 192, 1)',
					// data: [89, 45, 69, 12, 10, 2, 34, 21, 97, 59, 74, 9]
					data: grafico.totalPorEmpresa.map(({ total }) => total.toFixed(2))
				}
			]
		};

		return (
			<Line
				data={data}
				width={100}
				height={30}
				options={{
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true
								}
							}
						]
					}
				}}
			/>
		);
	};

	return (
		<div>
			{/* {grafico.totalPorEmpresa.length > 0 &&
				console.log(grafico.totalPorEmpresa[0].orgao)} */}
			{grafico.loadingTotalEmpresa && <Spinner />}
			{grafico.totalPorEmpresa.length > 0 && showChart()}
		</div>
	);
}
