import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './style.css';

export default function index() {
	return (
		<div className="box-spinner">
			<Spinner animation="border" variant="info"></Spinner>
			<span> Processando...</span>
		</div>
	);
}
