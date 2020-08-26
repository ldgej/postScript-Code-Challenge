import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from './Menu';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('The Menu component', () => {
	let mockFunc = jest.fn();
	const props = {
		viewshowData: mockFunc
	}
	const MenuComponent = shallow(<Menu {...props} />);

	it('should render without error', () => {
		expect(MenuComponent.length).toBe(1);
	})

	it('should render 3 navItem', () => {
		const navItem = MenuComponent.find('.navItem');
		expect(navItem.length).toEqual(3);
	})
	it('function should be called when the navLink is clicked', () => {
		const navLink = MenuComponent.find(`[data-test='navLink']`).at(0);
		navLink.simulate('click');
		let callback = mockFunc.mock.calls.length;
		expect(callback).toBe(1);
		
	})
})