import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getAllowedRoutes } from 'utils';
import { JumbotronWrapper } from '../common';
import MapAllowedRoutes from 'routes/MapAllowedRoutes';

import './style.css';

const basePath = '/app/relatorios';
function Relatorios({ children }) {
	const allowedRoutes = getAllowedRoutes(children);
	return (
		<JumbotronWrapper title="Relatórios">
			<div className="box-links">
				{allowedRoutes.map(({ path, title }) => (
					<div className="button-link">
						<Link key={path} to={`${basePath}${path}`}>
							{title}
						</Link>
					</div>
				))}
			</div>

			<MapAllowedRoutes routes={allowedRoutes} basePath={basePath} />
		</JumbotronWrapper>
	);
}

export default memo(Relatorios);
