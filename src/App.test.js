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
			postScriptReducer:{
				"campaigns": [
				  {
					"id": 1,
					"name": "Fourth of July Promo",
					"text": "Hi {first_name}, it's {shop_name}! This 4th of July celebrate with our Freedom Sale!",
					"status": "Sent",
					"segment_id": 1,
					"media": "https://images.unsplash.com/photo-1556804335-2fa563e93aae",
					"stats": {
					  "sent": 6506,
					  "clicked": 6137
					}
				  }
				],
				"segments": [
				  { "id": 1, "name": "All Subscribers", "subscribers_count": 8920 },
				  { "id": 2, "name": "Beauty Purchases", "subscribers_count": 7108 },
				  { "id": 3, "name": "Decor Purchases", "subscribers_count": 1204 }
				],
				"tag":{
					'{first_name}':	'Evans',
					'{shop_link}':'www.evans.com',
					'{shop_name}':'evans store',
					'{custom_links}':'www.link-evans.com',
					 '{personalized}': '989898'
				}
			}	  
		}
		const store=testStore(initialState);
		const wrapper=shallow(<App store={store}/>).childAt(0).dive();
		expect(wrapper.find('.AppContainer').length).toBe(1);
	})
})