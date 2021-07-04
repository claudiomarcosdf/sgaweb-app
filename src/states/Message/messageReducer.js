const SET_MESSAGE = 'SET_MESSAGE';

const initialState = {
	message: {
		error: false,
		success: false,
		warning: false,
		messageSuccess: '',
		messageWarning: ''
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_MESSAGE:
			return {
				...state,
				message: action.payload ? action.payload : { ...initialState }
			};
		default:
			return state;
	}
};

export default reducer;
