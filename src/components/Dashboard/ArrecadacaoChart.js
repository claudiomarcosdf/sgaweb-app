/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import { Bar } from 'react-chartjs-2';

import moment from 'moment';
import * as format from '../../utils/helpers';
import { useRecebimentoContext } from '../../context/RecebimentoContext';
import Spinner from '../common/Spinner';

export default function ArrecadacaoChart() {
	const currentYear = moment().format('YYYY');
	const { grafico } = useRecebimentoContext();
	const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	useEffect(() => {
		console.log('effect ' + grafico.anoSelecionado);
		grafico.getDataChart({
			variables: {
				ano: grafico.anoSelecionado ? grafico.anoSelecionado : currentYear
			}
		});
	}, [grafico.anoSelecionado]);

	const handleAnteriorClick = (event) => {
		event.preventDefault(event);
		console.log('click');

		grafico.setAnoSelecionado(format.anoAnteriorString(currentYear));
	};

	const handleAtualClick = (event) => {
		event.preventDefault(event);

		grafico.setAnoSelecionado(currentYear);
	};

	// const [dataChart, setDataChart] = useState(data);

	// useEffect(() => {
	// 	const newDataSets = { ...dataChart.datasets[0], data: grafico.totais };

	// 	setDataChart({
	// 		...dataChart,
	// 		datasets: [newDataSets]
	// 	});
	// }, [grafico.totais]);

	const dados = {
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
				label: grafico.anoSelecionado
					? 'Arrecadação mensal de ' + grafico.anoSelecionado
					: 'Arrecadação mensal de ' + currentYear,
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 2,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: grafico.totais.length > 0 ? grafico.totais : emptyData
			}
		]
	};

	const opcoes = {
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

	const showChart = () => {
		return (
			<>
				<Button
					variant="outline-success"
					size="sm"
					onClick={(e) => handleAnteriorClick(e)}
				>
					Ano anterior
				</Button>{' '}
				<Button
					variant="outline-success"
					size="sm"
					style={{ width: '106.53px' }}
					onClick={(e) => handleAtualClick(e)}
				>
					Ano atual
				</Button>
				<Bar data={dados} width={100} height={30} options={opcoes} />
			</>
		);
	};

	return (
		<div>
			{/* {console.log('body')} */}
			{grafico.loadingTotais && <Spinner />}
			{grafico.totais.length > 0 && showChart()}
		</div>
	);
}

//export default memo(ArrecadacaoChart);
