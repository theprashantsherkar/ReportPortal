import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer';

const Store = configureStore({
    reducer: {
        root: rootReducer,
    }
});

export default Store;