import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer from "./reducers/index"
import firebaseMessages from "./middlewares/firebaseMessages"

const store = createStore(reducer, applyMiddleware(firebaseMessages));
store.dispatch({type: 'FIREBASE_INIT'})
window.store = store;
export default store;

