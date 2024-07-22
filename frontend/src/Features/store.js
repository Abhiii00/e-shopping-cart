import cartSlice from '../Features/cartSlice';
import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, cartSlice)  

const store = configureStore({
  reducer:{
    cart: persistedReducer
  }
})

export const persistor = persistStore(store)

export default store
