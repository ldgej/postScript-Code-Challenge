import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from "./reducers";
import logger from "redux-logger";
const middlewares = [ReduxThunk,logger];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(reducer)
export default store