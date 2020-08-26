import React from 'react';
import { shallow } from 'enzyme';
import { Detail } from './Detail';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('The Detail component', () => {
	
	const DetailComponent = shallow(<Detail/>);

	it('should render without error', () => {
		expect(DetailComponent.length).toBe(1);
	})


})