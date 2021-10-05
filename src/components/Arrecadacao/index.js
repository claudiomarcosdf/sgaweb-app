import React, { memo, useState } from 'react';
import { JumbotronWrapper } from '../common';

import FindFilter from './FindFilter';
import List from './List';
import Sumary from './Sumary';
import Spinner from '../common/Spinner';
import { useRecebimentoContext } from '../../context/RecebimentoContext';

function Arrecadacao() {
	const { consulta } = useRecebimentoContext();
	const [filter, setFilter] = useState({});

	const handleClick = (filter) => {
		setFilter({ ...filter });

		consulta.filter({
			variables: { ...filter }
		});
	};

	return (
		<>
			{/* {console.log(consulta.dataFilter.reducer((acc, cur) => acc + cur.valor))} */}
			<JumbotronWrapper title="Arrecadação">
				<FindFilter onClick={handleClick} />
				{consulta.loadingFilter && <Spinner />}

				{consulta.dataFilter.length > 0 && (
					<>
						<Sumary
							period={`${consulta.dataFilter[0].mes}/${consulta.dataFilter[0].ano}`}
							registers={consulta.dataFilter.length}
							amount={consulta.dataFilter.reduce((acc, cur) => {
								return acc + cur.valor;
							}, 0)}
						/>
						<List registers={consulta.dataFilter} filtro={filter} />
					</>
				)}
			</JumbotronWrapper>
		</>
	);
}

export default memo(Arrecadacao);
