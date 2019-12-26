import { createStore } from 'redux';
import rootReducer from './reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const isDev = process.env.NODE_ENV === 'development';
    const reduxDevTools = isDev && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    const store = createStore(persistedReducer, reduxDevTools);
    const persistor = persistStore(store);
    return {store, persistor}
};