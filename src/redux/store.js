import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSagaMiddleware from "redux-saga"
import storage from 'redux-persist/lib/storage'; // Choose your storage engine
import { persistReducer } from 'redux-persist';
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import buyerRequestsSlice from './slices/getBuyerRequestSlice';
import CustomerAccountSlice from "./slices/CustomersSlice";
import AdminAccountSlice from "./slices/adminSlice";

const reducers = combineReducers({
    buyerRequests: buyerRequestsSlice,
    //KurimiRegister: KurimiSlice,
    CustomerAccount: CustomerAccountSlice,
    AdminAccount: AdminAccountSlice


});

let sagaMiddleware = createSagaMiddleware();
/*
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
*/
const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
   // whitelist: ['kurimi'], // In this example, we persist the 'user' reducer
  };

const persistedReducer   = persistReducer(persistConfig, reducers);
/*
//persistedReducer السابق الصالح قبل 
const store = configureStore({
    reducer: reducers,
    middleware:() =>[thunk, sagaMiddleware],
    //middleware:() =>[thunk],
  });
*/
const store = configureStore({
    reducer: persistedReducer,
    middleware:() =>[thunk],
    //middleware:() =>[thunk],
  });


  //sagaMiddleware.run(authSaga);
//export {store, persistor}
export {store}