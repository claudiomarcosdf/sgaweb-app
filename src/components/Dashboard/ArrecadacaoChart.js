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

		return (
			<Bar
				data={data}
				width={100}
				height={30}
				options={{
					maintainAspectRatio: true
				}}
			/>
		);
	};

	return (
		<div>
			{/* {console.log(dataChart)} */}
			{grafico.loadingTotais && <Spinner />}
			{grafico.totais.length > 0 && showChart()}
		</div>
	);
}
