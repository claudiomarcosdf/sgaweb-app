import React from 'react';

import '../style.css';
import * as format from '../../../utils/helpers';

export default function Sumary({ period = '', registers = 0, amount = 0 }) {
	return (
		<div className="sumary">
			<div>
				<span className="sumary-destak">{`Arrecadação do mês ${period}`}</span>
			</div>
			<div>
				<span className="spaces sumary-destak">Registros: {registers}</span>
				<span className="sumary-destak">
					Total {format.formatCurrency(amount)}
				</span>
			</div>
		</div>
	);
}
