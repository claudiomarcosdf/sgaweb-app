import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MessageConfig() {
	return (
		<>
			<ToastContainer autoClose={3000} />
		</>
	);
}
