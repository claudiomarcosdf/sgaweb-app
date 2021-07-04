import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DadosPessoaisForm from '../DadosPessoaisForm';
import EnderecoForm from '../EnderecoForm';
import EmpresaForm from '../EmpresaForm';
import { useContextForm } from '../index';

export default function AbasAssociado(props) {
	const { form } = useContextForm();

	const [activeToggle, setActiveToggle] = useState('0');

	useEffect(() => {
		if (form.disableForm) setActiveToggle('0');
	}, [form.disableForm]);

	const handleClick = (e) => {
		setActiveToggle(e.target.id);
	};

	return (
		<>
			{/* <Accordion defaultActiveKey="0"> */}
			<Accordion activeKey={activeToggle}>
				<Card>
					<Card.Header>
						<Accordion.Toggle
							id="0"
							as={Button}
							variant="btn btn-outline-secondary"
							eventKey="0"
							disabled={form.disableForm}
							onClick={handleClick}
						>
							Dados pessoais
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={form.disableForm ? '' : '0'}>
						<Card.Body>
							<DadosPessoaisForm />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle
							id="1"
							as={Button}
							variant="btn btn-outline-secondary"
							eventKey="1"
							disabled={form.disableForm}
							onClick={handleClick}
						>
							Endereço e contatos
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={form.disableForm ? '' : '1'}>
						<Card.Body>
							<EnderecoForm />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle
							id="2"
							as={Button}
							variant="btn btn-outline-secondary"
							eventKey="2"
							disabled={form.disableForm}
							onClick={handleClick}
						>
							Empresa
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey={form.disableForm ? '' : '2'}>
						<Card.Body>
							<EmpresaForm />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
}
