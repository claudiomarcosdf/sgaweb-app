import React from 'react';
import AssociadoContextProvider from './AssociadoContext';
import RecebimentoContextProvider from './RecebimentoContext';
import EmpresaContextProvider from './EmpresaContext';
import OrgaoContextProvider from './OrgaoContext';
import RelatorioContextProvider from './RelatorioContext';
import { AuthProvider } from './AuthContext';

const composeProviders = (...providers) => (props) =>
	providers.reduceRight((children, Provider) => {
		return <Provider {...props}>{children}</Provider>;
	}, props.children);

export const AllContextProviders = composeProviders(
	AuthProvider,
	AssociadoContextProvider,
	RecebimentoContextProvider,
	EmpresaContextProvider,
	OrgaoContextProvider,
	RelatorioContextProvider
);
