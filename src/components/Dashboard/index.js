import React, { memo } from 'react';
import { JumbotronWrapper } from '../common';
import ArrecadacaoChart from './ArrecadacaoChart';
import AssociadoCard from './AssociadoCard';

function Dashboard() {
	return (
		<>
			<JumbotronWrapper title="Painel de gestão">
				<AssociadoCard />
				<ArrecadacaoChart />
			</JumbotronWrapper>
		</>
	);
}

export default memo(Dashboard);
