import { Roles } from 'config';

// Components
import Relatorios from 'components/Relatorios/Relatorios';
import RelatorioAssociado from 'components/Relatorios/RelatorioAssociado';
import RelatorioArrecadacao from 'components/Relatorios/RelatorioArrecadacao';
import RelatorioTabelas from 'components/Relatorios/RelatorioTabelas';

import { Dashboard, Profile } from 'components';

import Associado from 'components/Associado';
import Importacao from 'components/Importacao';
import Arrecadacao from 'components/Arrecadacao';

// TODO:
/*
 * 1. Make title optional
 * 2. Make title multi type support ie: (string, node, react element)
 * 3. Add child route support
 * */

/*
 * Route config object supports all react-router's route component props with some additional props ie: (title, permission, children)
 * you can add or remove props from config object it's means it is super customizable and support upto N nesting, child routes must follow the same parent shape,
 * it means the config object is same for both there is no additional key for child nor for parent.
 * you can find route props from here https://reactrouter.com/web/api/Route let's take a look at some additional props
 * 1. permission: permission is an optional prop and it's type is an array of roles, permission is used for allowing certain users/roles
 *  	to have access of that route and if you skip/omit the permission or it's an empty array that means every authenticated user/role have access to that route.
 * 2. title: title is an optional prop and it's type is a string|node it is used for mapping route link into a navigation
 * 3. children: children is also an optional prop and it's type is an array of route config objects, children are used for nested routes
 * */

export default [
	{
		component: Dashboard,
		path: '/',
		title: 'Painel de gestão',
		exact: true
	},
	{
		component: Associado,
		path: '/associado',
		title: 'Associado',
		exact: true
	},
	{
		component: Importacao,
		path: '/importacao',
		title: 'Importação'
	},
	{
		component: Arrecadacao,
		path: '/Arrecadacao',
		title: 'Arrecadação',
		permission: [Roles.SUPER, Roles.ADMIN]
	},
	{
		component: Relatorios,
		path: '/relatorios',
		title: 'Relatórios',
		children: [
			{
				component: RelatorioAssociado,
				path: '/relatorio-associado',
				title: 'Associados'
			},
			{
				component: RelatorioArrecadacao,
				path: '/relatorio-arrecadacao',
				title: 'Arrecadação',
				permission: [Roles.SUPER, Roles.ADMIN]
			},
			{
				component: RelatorioTabelas,
				path: '/relatorio-tabelas',
				title: 'Tabelas do sistema'
			}
		]
	},
	// {
	// 	component: Dashboard,
	// 	path: '/dashboard',
	// 	title: 'Dashboard',
	// 	permission: [Roles.SUPER_ADMIN, Roles.ADMIN]
	// },
	{
		component: Profile,
		path: '/profile',
		title: 'Perfil',
		permission: [Roles.SUPER, Roles.ADMIN, Roles.COMUM]
	}
];
