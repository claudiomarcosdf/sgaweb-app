function formatCurrency(value) {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatNumber(value) {
	return value.toLocaleString('pt-BR', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
}

function formatBrazil(value) {
	return value.toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}

function formatDateBr(date) {
	if (!date) {
		return;
	}

	const dateToFormat = date.substring(0, 10);
	const currentDate = new Date(dateToFormat);
	const dateFormated = new Intl.DateTimeFormat('pt-BR', {
		timeZone: 'UTC'
	}).format(currentDate);

	return dateFormated;
}

function formatDateToField(date) {
	//Recebe uma data string : 2008-01-01T00:00:00.000Z e devolve apenas a data para uso nos componentes
	if (!date) {
		return;
	}
	const dateFormated = date.substring(0, 10);
	return dateFormated;
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

//Retorna primeira letra em Caixa alta
function capitalize(value) {
	const textLowerCase = value.toLowerCase();
	return textLowerCase.charAt(0).toUpperCase() + textLowerCase.slice(1);
}

function capitalizeFullName(value) {
	var splitStr = value.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
}

function formatCpfToView(value) {
	return (
		value.substr(0, 3) +
		'.' +
		value.substr(3, 3) +
		'.' +
		value.substr(6, 3) +
		'-' +
		value.substr(9, 2)
	);
}

function zeroDecimal(value) {
	const valueString = value.toString();
	if (valueString.length <= 2) {
		return '0' + valueString;
	} else return valueString;
}

function isMatricula(value) {
	const regex = /[0-9]/;
	return regex.test(value);
}

export {
	formatCurrency,
	formatNumber,
	formatBrazil,
	formatDateBr,
	capitalize,
	capitalizeFullName,
	formatDateToField,
	isNumber,
	formatCpfToView,
	zeroDecimal,
	isMatricula
};
