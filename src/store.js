import { createStore } from 'redux';

import messageState from './states/Message/messageReducer';

const store = createStore(messageState);

export default store;
