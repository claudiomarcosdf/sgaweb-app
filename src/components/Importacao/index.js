import React, { memo, useState } from 'react';
import { JumbotronWrapper } from '../common';
import Form from 'react-bootstrap/Form';

import Spinner from '../common/Spinner';
import AlertImport from 'components/common/AlertImport';
import { useRecebimentoContext } from '../../context/RecebimentoContext';
import moment from 'moment';

import './style.css';
import { FILTRO_GRAFICO } from '../../graphql/recebimento';
import { isNumber } from '../../utils/helpers';

function Importacao() {
	const currentYear = moment().format('YYYY');

	const [fileToUpload, setFileToUpload] = useState(null);
	const [feedback, setFeedback] = useState('');
	const [alert, setAlert] = useState(false);
	const [action, setAction] = useState(false);
	const { recebimento, file } = useRecebimentoContext();

	const checkRecebimento = (ano, mes, rubrica) => {
		recebimento.verify({
			variables: { ano, mes, rubrica }
		});
	};

	const handleChange = ({
		target: {
			validity,
			files: [file]
		}
	}) => {
		// const fileSelected = e.target.files[0];
		setFeedback('');
		const fileSelected = file;

		if (fileSelected) {
			const mes = fileSelected.name.substr(23, 2);
			const ano = fileSelected.name.substr(25, 4);
			const rubrica = fileSelected.name.substr(17, 5);

			if (
				ano &&
				mes &&
				rubrica &&
				isNumber(ano) &&
				isNumber(mes) &&
				isNumber(rubrica)
			) {
				setFeedback(`Mês: ${mes} | Ano: ${ano} | Rubrica: ${rubrica}`);
				setAlert(false);
				setAction(true);
				checkRecebimento(ano, mes, rubrica);
				setFileToUpload(fileSelected);
			} else {
				setFeedback(fileSelected.name);
				setAction(false);
				setAlert(true);
			}
		}
	};

	const handleImport = async () => {
		await file.upload({
			variables: { file: fileToUpload },
			//O refetch abaixo não funcionou
			refetchQueries: [
				{ query: FILTRO_GRAFICO, variables: { ano: currentYear } }
			]
		});

		setAction(false);
	};

	return (
		<JumbotronWrapper title="Importação">
			<div>
				<Form.File id="custom-file" custom>
					<Form.File.Input
						accept=".dat, .*"
						onChange={handleChange}
						type="file"
					/>
					<Form.File.Label data-browse="Selecionar arquivo">
						{fileToUpload
							? fileToUpload.name
							: 'Selecione o arquivo para importação'}
					</Form.File.Label>
					<span className="feed">{feedback}</span>
				</Form.File>
				<div>
					{recebimento.loading && <Spinner />}
					{file.loadingUpload && <Spinner />}
					{alert && (
						<AlertImport variant="danger" onClose={() => setAlert(false)} />
					)}
					{!recebimento.recebidos && action && !recebimento.loading && (
						<AlertImport
							variant="success"
							onClick={handleImport}
							onClose={() => setAction(false)}
						/>
					)}
				</div>
			</div>
		</JumbotronWrapper>
	);
}

export default memo(Importacao);
