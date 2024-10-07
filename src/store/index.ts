import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import bitcoinReducer from './slices/bitcoinSlice';
import { AnyAction } from 'redux';

const combinedReducer = combineReducers({
    bitcoin: bitcoinReducer,
});

const rootReducer = (
    state: ReturnType<typeof combinedReducer> | undefined,
    action: AnyAction
) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    } else {
        return combinedReducer(state, action);
    }
};

const makeStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);