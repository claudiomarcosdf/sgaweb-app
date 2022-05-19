import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Spinner from '../../../components/common/Spinner';

import '../style.css';
import * as format from '../../../utils/helpers';
import { useAssociadoContext } from 'context/AssociadoContext';

export default function PesquisaAssociados({ show, onClose }) {
	const [ativo, setAtivo] = useState(true);
	const [nomeBusca, setNomeBusca] = useState('');

	const { pesquisa } = useAssociadoContext();
	const { associado } = useAssociadoContext();

	const handleChangeChecked = (event) => {
		const { checked } = event.target;

		setAtivo(checked);
	};

	const handlerChange = (event) => {
		event.preventDefault();
		const nome = event.target.value;
		setNomeBusca(nome);

		if (nomeBusca.length > 3) {
			setTimeout(() => {
				pesquisa.findNomes({
					variables: {
						nome: nomeBusca,
						status: ativo ? 'ATIVO' : 'INATIVO'
					}
				});
			}, '1000');
		}
	};

	const handlerClick = (value) => {
		associado.findBy({
			variables: {
				nome: value,
				matricula: null,
				status: ativo ? 'ATIVO' : 'INATIVO'
			}
		});

		onClose();
	};

	return (
		<>
			<Modal size="lg" show={show} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>Pesquisa de associados</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col>
								<input
									className="form-control w-100 mt-2"
									type="search"
									placeholder="Digite o nome do associado"
									aria-label="Digite o nome"
									onChange={handlerChange}
									value={nomeBusca}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Check
									className="mt-2 switch mb-4"
									type="switch"
									id="status-pesquisa"
									name="status-pesquisa"
									label={ativo ? 'Somente os ativos' : 'Somente os desfiliados'}
									onChange={handleChangeChecked}
									checked={ativo}
								/>
							</Col>
						</Row>
						<Table striped bordered hover responsive size="sm">
							<thead>
								<tr>
									<th>#</th>
									<th>Matrícula</th>
									<th>Nome</th>
									<th>CPF</th>
									<th>Empresa</th>
								</tr>
							</thead>
							<tbody>
								{pesquisa.associados.length <= 0 ? (
									<tr>
										<td colSpan={5} className="small text-center text-muted">
											Nenhum associado encontrado
										</td>
									</tr>
								) : (
									<>
										{pesquisa.associados &&
											pesquisa.associados.map((associado, idx) => {
												return (
													<tr
														key={idx}
														onClick={() => handlerClick(associado.nome)}
													>
														<td>{idx + 1}</td>
														<td>{associado?.matricula}</td>
														<td>{associado?.nome}</td>
														<td>
															{format.formatCpfToView(
																associado?.dados_pessoais?.cpf
															)}
														</td>
														<td>{associado?.empresa?.sigla}</td>
													</tr>
												);
											})}
									</>
								)}
							</tbody>
						</Table>

						<div className="box">{pesquisa.loadingPesquisa && <Spinner />}</div>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={onClose}>
						Sair
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
