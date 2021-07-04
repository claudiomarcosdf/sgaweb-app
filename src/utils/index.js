import { intersection } from 'lodash';
import jwtDecode from 'jwt-decode';

export function isLoggedIn() {
	if (localStorage.getItem('jwtToken')) {
		const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

		if (decodedToken.exp * 1000 < Date.now()) {
			localStorage.removeItem('jwtToken');
		}
	}

	return !!localStorage.getItem('jwtToken');
}

export function isArrayWithLength(arr) {
	return Array.isArray(arr) && arr.length;
}

export function getAllowedRoutes(routes) {
	const user = jwtDecode(localStorage.getItem('jwtToken'));
	// const roles = JSON.parse(localStorage.getItem('roles'));

	return routes.filter(({ permission }) => {
		if (!permission) return true;
		else if (!isArrayWithLength(permission)) return true;
		else return intersection(permission, user.perfis).length;
		// else return intersection(permission, roles).length;
	});
}
