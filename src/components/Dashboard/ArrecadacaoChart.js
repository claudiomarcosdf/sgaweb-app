/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { Bar } from 'react-chartjs-2';

import { useRecebimentoContext } from '../../context/RecebimentoContext';
import Spinner from '../common/Spinner';
import moment from 'moment';

export default function ArrecadacaoChart() {
	const currentYear = moment().format('YYYY');
	const { grafico } = useRecebimentoContext();
	const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	useEffect(() => {
		grafico.getDataChart({ variables: { ano: currentYear } });
	}, []);

	// const [dataChart, setDataChart] = useState(data);

	// useEffect(() => {
	// 	const newDataSets = { ...dataChart.datasets[0], data: grafico.totais };

	// 	setDataChart({
	// 		...dataChart,
	// 		datasets: [newDataSets]
	// 	});
	// }, [grafico.totais]);

	const showChart = () => {
		console.log(grafico.totais);

		const data = {
			labels: [
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
			],
			datasets: [
				{
					label: 'Arrecadação mensal de ' + currentYear,
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 2,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: grafico.totais.length > 0 ? grafico.totais : emptyData
				}
			]
		};

		const options = {
			maintainAspectRatio: true,
			tooltips: {
				enabled: true,
				mode: 'single',
				callbacks: {
					label: function(tooltipItem, data) {
						let label = data.labels[tooltipItem.index];
						let datasetLabel =
							data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						let formattedNumber = datasetLabel.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						});
						return label + ': ' + formattedNumber;
					}
				}
			},
			scales: {
				yAxes: [
					{
						ticks: {
							callback: function(value, index, values) {
								return value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL'
								});
							}
						}
					}
				]
			}
		};

		return <Bar data={data} width={100} height={30} options={options} />;
	};

	return (
		<div>
			{/* {console.log(dataChart)} */}
			{grafico.loadingTotais && <Spinner />}
			{grafico.totais.length > 0 && showChart()}
		</div>
	);
}
