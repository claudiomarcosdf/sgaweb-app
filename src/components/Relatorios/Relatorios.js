import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getAllowedRoutes } from 'utils';
import { JumbotronWrapper } from '../common';
import MapAllowedRoutes from 'routes/MapAllowedRoutes';

const basePath = '/app/relatorios';
function Relatorios({ children }) {
	const allowedRoutes = getAllowedRoutes(children);
	return (
		<JumbotronWrapper title="Relatórios">
			{allowedRoutes.map(({ path, title }) => (
				<Link
					key={path}
					to={`${basePath}${path}`}
					style={{ marginRight: '15px', color: '#0466c8' }}
				>
					{title}
				</Link>
			))}

			<MapAllowedRoutes routes={allowedRoutes} basePath={basePath} />
		</JumbotronWrapper>
	);
}

export default memo(Relatorios);
