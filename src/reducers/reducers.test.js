
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import artistReducer from './artistReducer';


Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('artist Reducer',()=>{
	
it('artist Reducer should return default value',()=>{
	let newState=artistReducer(undefined, {});
	expect(newState).toEqual({artistData: { error: ' ' }})	
})
it('artist Reducer should return expected value when action is dispatched',()=>{
	let newState=artistReducer(undefined,{
		type: 'setArtistData',
        res:{data:'data'}
	})
	expect(newState).toEqual({ 'artistData':{data:'data'}});
})
});
