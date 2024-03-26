import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSagaMiddleware from "redux-saga"
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import buyerRequestsSlice from './slices/getBuyerRequestSlice'
const reducers = combineReducers({
    buyerRequests: buyerRequestsSlice,

});

let sagaMiddleware = createSagaMiddleware();
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer   = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: reducers,
    middleware:() =>[thunk, sagaMiddleware],
    //middleware:() =>[thunk],

  });

  //sagaMiddleware.run(authSaga);
//export {store, persistor}
export {store}