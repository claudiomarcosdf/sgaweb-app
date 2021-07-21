import React from 'react';

function Footer(props) {
	return (
		<div style={format}>
			<span style={{ textAlign: 'center' }}>
				Copyright © 2021 - Todos os direitos reservados | Desenvolvido por{' '}
				<b>
					<a
						href="https://www.linkedin.com/in/claudio-marcos-developer"
						target="_blank"
						rel="noopener noreferrer"
					>
						Claudio Marcos
					</a>
				</b>
			</span>
		</div>
	);
}

const format = {
	backgroundColor: '#adadad',
	display: 'flex',
	justifyContent: 'center',
	padding: '20px 0px'
};

export default Footer;
