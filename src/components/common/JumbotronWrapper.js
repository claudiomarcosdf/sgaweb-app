import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Jumbotron } from 'react-bootstrap';
import { CenterToScreen } from './hoc';

const JumbotronWrapper = (props) => {
	return (
		<Col {...props.col}>
			<Jumbotron style={styles}>
				<h2>{props.title}</h2>
				<hr />
				{/* <p>{props.description}</p> */}
				{/* <div style={{ color: '#0056b3' }}>{props.children}</div> */}
				<div>{props.children}</div>
			</Jumbotron>
		</Col>
	);
};

JumbotronWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	col: PropTypes.object
};

JumbotronWrapper.defaultProps = {
	// description: 'Ohhh!!! Não tem nada aqui véi.',
	col: { md: '10' }
};

const styles = {
	paddingTop: '20px',
	backgroundColor: '#f2f1f0'
};

export default memo(CenterToScreen(JumbotronWrapper));
