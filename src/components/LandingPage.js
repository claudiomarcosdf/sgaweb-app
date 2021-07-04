import React, { memo } from 'react';
import { TopNav } from './common';

const navOptions = [
	{ title: 'Login', path: '/login' },
	{ title: 'Registrar', path: '/register' }
];

function LandingPage() {
	return (
		<div className="bgimg w3-display-container w3-animate-opacity w3-text-white">
			<TopNav routes={navOptions} />
			<div className="w3-display-middle">
				<h1 className="w3-jumbo w3-animate-top">SGA WEB</h1>
				<hr
					className="w3-border-grey"
					style={{ margin: 'auto', width: '40%' }}
				/>
				<p className="w3-large w3-center">Sistema de Gestão Administrativa.</p>
			</div>
			<div className="w3-display-bottomleft w3-padding-large">
				Developed by{' '}
				<a
					href="https://www.linkedin.com/in/claudio-marcos-de-jesus-b876a21ab/"
					target="_blank"
					rel="noopener noreferrer"
				>
					claudio-marcos
				</a>
			</div>
		</div>
	);
}

export default memo(LandingPage);
