import App from './App';
import { shallow } from 'enzyme';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from "./reducers";
import logger from "redux-logger";
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new EnzymeAdapter()});
const middlewares = [ReduxThunk,logger];

describe('App Component should render',()=>{
	it(' and reducer Data should injected from store properly ',()=>{
		const testStore = (initialState) => {
			const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
			return createStoreWithMiddleware(reducer, initialState);
		};
		const initialState = {
			artistReducer:{artistData: { error: ' ' }}
		}
		const store=testStore(initialState);
		const wrapper=shallow(<App store={store}/>).childAt(0).dive();
		console.log(wrapper.debug());
		expect(wrapper.find('.AppContainer').length).toBe(1);

	})

})