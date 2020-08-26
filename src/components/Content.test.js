import React from 'react';
import { shallow } from 'enzyme';
import { Content } from './Content';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('The Content component', () => {
	const props = {
		showData: [{
			id: 4,
			media: "https://images.unsplash.com/photo-1568485248685-019a98426c14",
			name: "Fall Decor Updates",
			segment: { id: 3, name: "Decor Purchases1", subscribers_count: 1204 },
			segment_id: 3,
			stats: null,
			status: "Preview",
			text: "Hey {first_name}! Back at {shop_name} "
		},
	    {
			id: 5,
			media: "https://images.unsplash.com/photo-1568485248685-019a98426c14",
			name: "Sunny",
			segment: { id: 4, name: "Decor Purchases2", subscribers_count: 2204 },
			segment_id: 3,
			stats: null,
			status: "Preview",
			text: " we've gotten a WILD amount of home updates you"
		}
	]
	}
	const ContentComponent = shallow(<Content {...props} />);

	it('should render without error', () => {
		expect(ContentComponent.length).toBe(1);
	})

	it('should render 3 Card Item', () => {
		const CardItem = ContentComponent.find('.card');
		let propsLength=props.showData.length;
		expect(propsLength).toEqual(CardItem.length);
	})

})