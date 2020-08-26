import React, { useState, useEffect } from 'react'
import * as postScriptActions from '../actions/postScriptActions';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';

export const Detail = (props) => {

	const [campaign, setCampaign] = useState(null);
	const [showPreviev, setShowPreview] = useState(false);
	const [segment, setSegment] = useState(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);
	const { campaigns, segments, previewMessage, tag } = props;
	let history = useHistory();

	const parseString = (str) => {
		let newarr = str.split(' ').map((item) => {
			if (Object.keys(tag).includes(item)) {
				return tag[item];
			}
			else if (Object.keys(tag).includes(item.substring(0, item.length - 1))) {
				return tag[item.substring(0, item.length - 1)]
			}
			else {
				return item
			}
		})
		return newarr.join(' ')
	}

	const handleOnSubmitData = () => {
		previewMessage(campaign);
		history.push('/')
	}

	const getCampangnById = () => {
		const id = props.match.params.id;
		let campaign = campaigns.find((item) => {
			return item.id == id;
		})
		const segment = segments.find((seg) => {
			return seg.id === campaign.segment_id
		})
		setCampaign(campaign);
		setSegment(segment);

	}

	const handleOnChange = (key, value) => {
		setCampaign({
			...campaign,
			[key]: value
		})
	}

	const handleOnChangeDrop = (item) => {
		setSegment(item);
		setCampaign({
			...campaign,
			segment_id: item.id
		});

	}

	const saveChange = () => {
		setShowPreview(true);
	}
	useEffect(() => {
		getCampangnById();
	}, [])
	return (
		<div className='form '>
			{campaign && <Form className=' m-3 p-3 text-white'>
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
						{segment && <Dropdown isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle caret>
								{segment.name}
							</DropdownToggle>
							<DropdownMenu>
								{segments.filter((ele) => {
									return ele.name !== segment.name
								}).map((item, index) => {
									return <DropdownItem
										key={index}
										data-test='dropdownItem'
										onClick={() => { handleOnChangeDrop(item) }}
									>
										{item.name}
									</DropdownItem>
								})}
							</DropdownMenu>
						</Dropdown>}
						<h5>Count</h5>
						<span className='bg-secondary'>{segment.subscribers_count}</span>
					</div>
				</FormGroup>

				<FormGroup>
					<Label for="message">Media Link :</Label>
					<Input type="text"
						value={campaign.media}
						onChange={(e) => handleOnChange('media', e.target.value)}
						id="message" />
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
			</Form>
			}
			<Button color='primary' className='ml-4 mb-3' onClick={saveChange}>
				Go To Preview
			</Button>
			{showPreviev && <div className='border border-dark bg-info '>
				<Card className='border border-primary m-3 border-dark '>
					<CardImg className='w-25' src={campaign.media} alt="Card image cap" />
					<CardBody>

						{/* segment_id:{JSON.stringify(campaign.segment_id)} */}
						<CardTitle><h6>Message :</h6></CardTitle>
						<CardText>{parseString(campaign.text)}</CardText>

					</CardBody>
				</Card>

				<Button color='primary' onClick={handleOnSubmitData} className='m-3'>
					Save To Preview
			    </Button>
				<Button color='light' className='m-1' onClick={() => { setShowPreview(false) }}>
					Cancel
			    </Button>
			</div>}
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
		previewMessage: postScriptActions.previewMessage
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)