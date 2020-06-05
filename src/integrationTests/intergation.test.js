import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from "../reducers";
import logger from "redux-logger";
import moxios from 'moxios';
import { getArtistData } from '../actions/artistActions';


const middlewares = [ReduxThunk, logger];
const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(reducer, initialState);
};


describe('fetchPosts action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Store is updated correctly', () => {

        const expectedState = [{
            name: 'Example name',
            url: 'Some url',

        }, {
            name: 'Example name',
            url: 'Some url'
        }, {
            name: 'Example name',
            url: 'Some url'
        }];

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(getArtistData())
            .then(() => {
                const newState = store.getState();
                expect(newState.artistReducer.artistData).toBe(expectedState);
            })
    });

});
