import React, { Component } from 'react'
import { Menu } from '../../components/Menu';
import { Content } from '../../components/Content';
import * as postScriptActions from '../../actions/postScriptActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './css.css'
export class PostScript extends Component {
	constructor(porps) {
		super(porps);
		this.state = {
			showData: null
		}
	}
	viewshowData = (param) => {
		const { campaigns } = this.props;
		const { segments } = this.props;
		if (param === 'unSent') {
			let unsentCampaigns = campaigns.filter((item) => {
				return item.status === 'Preview'
			})

			unsentCampaigns.forEach((item) => {
				const segment = segments.find((seg) => {
					return seg.id === item.segment_id
				})
				Object.assign(item, { segment: { ...segment } })
			});
			this.setState({ showData: unsentCampaigns })
			this.setState({ editable: true })
		}
		else if (param === 'sent') {
			let unsentCampaigns = campaigns.filter((item) => {
				return item.status === 'Sent'
			})
			this.setState({ showData: unsentCampaigns })
			this.setState({ editable: false })
		}
	}
	render() {
		const { showData } = this.state;
		return (
			<div className='postscript'>
				<Menu viewshowData={this.viewshowData} />
				<Content showData={showData} />
			</div>
		)
	}
}
const mapStateToProps = ({ postScriptReducer }) => {
	return {
		value: postScriptReducer.value,
		campaigns: postScriptReducer.campaigns,
		segments: postScriptReducer.segments
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		add: postScriptActions.add
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScript)