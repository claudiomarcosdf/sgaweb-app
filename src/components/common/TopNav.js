import React, { memo } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedIn } from 'utils';

function TopNav(props) {
	let history = useHistory();

	function handleLogout() {
		// localStorage.removeItem('roles');
		localStorage.removeItem('jwtToken');
		history.push('/');
	}

	const renderTooltip = (props) => (
		<Popover id={`popover-positioned-bottom`} {...props}>
			<Popover.Content>
				Cadastrar <strong>novo usuário</strong>
			</Popover.Content>
		</Popover>
	);

	const showLinks = (path, title) => {
		if (title === 'Registrar') {
			return (
				<OverlayTrigger
					placement="bottom"
					delay={{ show: 250, hide: 400 }}
					overlay={renderTooltip}
				>
					<Link
						key={path}
						className="w3-bar-item w3-hover-color w3-button w3-round"
						style={{ textDecoration: 'none' }}
						to={`${props.prefix}${path}`}
					>
						{title}
					</Link>
				</OverlayTrigger>
			);
		} else {
			return (
				<Link
					key={path}
					className="w3-bar-item w3-hover-color w3-button w3-round"
					style={{ textDecoration: 'none' }}
					to={`${props.prefix}${path}`}
				>
					{title}
				</Link>
			);
		}
	};

	return (
		<>
			<div className={`w3-bar w3-padding w3-card ${props.className}`}>
				<div className="w3-display-topleft w3-padding-large w3-xlarge">
					<i className="fab fa-accusoft"></i> SGA
				</div>
				<div className="w3-right ">
					{props.routes.map(({ path, title }) => showLinks(path, title))}
					{isLoggedIn() && (
						<Button
							onClick={handleLogout}
							// className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-blue"
							style={{ marginLeft: '10px' }}
						>
							Sair
						</Button>
					)}
				</div>
			</div>
		</>
	);
}

TopNav.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			path: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired,
	prefix: PropTypes.string,
	className: PropTypes.string
};

TopNav.defaultProps = {
	prefix: '',
	className: ''
};

export default memo(TopNav);
