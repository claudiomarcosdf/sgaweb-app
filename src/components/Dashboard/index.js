import React, { memo } from 'react';
import { JumbotronWrapper } from '../common';
import ArrecadacaoChart from './ArrecadacaoChart';
import AssociadoCard from './AssociadoCard';
import OrgaosChart from './OrgaosChart';

function Dashboard() {
	return (
		<>
			<JumbotronWrapper title="Painel de gestão">
				<AssociadoCard />
				<ArrecadacaoChart />
				<OrgaosChart />
			</JumbotronWrapper>
		</>
	);
}

export default memo(Dashboard);
