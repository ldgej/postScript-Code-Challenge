import React from 'react';
import { shallow } from 'enzyme';
import { NewCampaign } from './NewCampaign';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('The NewCampaign component', () => {
	
	const props = {
		segments:  [
			{ "id": 1, "name": "All Subscribers", "subscribers_count": 8920 },
			{ "id": 2, "name": "Beauty Purchases", "subscribers_count": 7108 },
			{ "id": 3, "name": "Decor Purchases", "subscribers_count": 1204 }
		  ]
	}
	const NewCampaignComponent = shallow(<NewCampaign {...props} />);

	it('should render without error', () => {
		expect(NewCampaignComponent.length).toBe(1);
	})

	it('should render same amuont of DropdownItem as data Array passed form props', () => {
		const DropdownItem = NewCampaignComponent.find(`[data-test='dropdownItem']`);
		let propsLength=props.segments.length;
		expect(DropdownItem.length).toEqual(propsLength);
	})

})