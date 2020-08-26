import React, { useState } from 'react'
import * as postScriptActions from '../actions/postScriptActions';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const NewCampaign = (props) => {
	const { segments, createPreview } = props;
	const handleOnChange = (key, value) => {
		setCampaign({
			...campaign,
			[key]: value
		})

	}
	let history = useHistory();
	const handleOnSubmitData = () => {
		createPreview(campaign);
		history.push('/');
	}
	const handleOnChangeDrop = (item) => {
		setSegment(item);
		setCampaign({
			...campaign,
			segment_id: item.id
		});
	}
	const [segment, setSegment] = useState({ name: 'Choose Segment' });
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);
	const [campaign, setCampaign] = useState({
		id: (new Date()).getTime(),
		status: 'Preview',
		stats: null
	});

	return (
		<div className='form'>
			<Form className=' m-3 p-3 text-white'>
				<FormGroup>
					<Label for="campaignname">Campaign Name :</Label>
					<Input
						type="text"
						id="campaignname"
						onChange={(e) => handleOnChange('name', e.target.value)}
						value={campaign.name}
						placeholder="Campaign Name" />
				</FormGroup>

				<FormGroup>
					<Label >Segment: </Label>
					<div>
						<Dropdown isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle caret>
								{segment.name}
							</DropdownToggle>
							<DropdownMenu>
								{segments.map((item, index) => {
									return <DropdownItem
										key={index}
										data-test='dropdownItem'
										onClick={() => { handleOnChangeDrop(item) }}
									>
										{item.name}
									</DropdownItem>
								})}
							</DropdownMenu>
						</Dropdown>

					</div>
				</FormGroup>

				<FormGroup>
					<Label for="media">Media Link :</Label>
					<Input type="text"
						value={campaign.media}
						onChange={(e) => handleOnChange('media', e.target.value)}
						id="media" />
				</FormGroup>

				<FormGroup>
					<Label for="message">Message :</Label>
					<Input
						type="textarea"
						value={campaign.text}
						onChange={(e) => handleOnChange('text', e.target.value)}
						id="message"
					/>
				</FormGroup>
				<Button color='primary' onClick={handleOnSubmitData} className='button m-3'>
					Save To Preview
			    </Button>
			</Form>
		</div>
	)
}
const mapStateToProps = ({ postScriptReducer }) => {
	return {
		campaigns: postScriptReducer.campaigns,
		segments: postScriptReducer.segments,
		tag: postScriptReducer.tag
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		createPreview: postScriptActions.createPreview
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign)