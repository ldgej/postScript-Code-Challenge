import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as artistActions from '../../actions/artistActions';
import { bindActionCreators } from "redux";
import { Button, Table, Toast, ToastBody, ToastHeader } from 'react-bootstrap';


class Artist extends Component {
	handleOnClick = () => {
		const { searchArtist } = this.state;
		const { getArtistData } = this.props;
		getArtistData(searchArtist);
	}
	constructor(props) {
		super(props);
		this.state = {
			searchArtist: 'cher'
		}
	}
	render() {
		const { artistData } = this.props;
		console.log('artistData', artistData);
		return (
			<React.Fragment>
				<div>
					<input
						type='text'
						value={this.state.searchArtist}
						onChange={(e) => { this.setState({ searchArtist: e.target.value }) }}
					/>
					<Button
						className='bg-primary btn'
						onClick={this.handleOnClick}>Search</Button>
				</div>
				<div>
					{artistData.error ? artistData.error :
						<div>
							<div className="p-3 bg-secondary my-2 ">
								<Toast>
									<ToastHeader>
										Name:{artistData.artist.name}
									</ToastHeader>
									<ToastBody>
										<strong>summary:</strong>{artistData.artist.bio.summary}
									</ToastBody>
								</Toast>
							</div>
							<Table hover>
								<thead>
									<tr>
										<th><strong>Relevant</strong></th>
										<th>Name</th>
										<th>Detail</th>
									</tr>
								</thead>
								<tbody>
									{artistData.artist.similar.artist.map((artist, index) => (
										<tr key={index + 1}>
											<th scope="row">{index + 1}</th>
											<td>{artist.name}</td>
											<td><Button href={artist.url}>Detail</Button></td>
										</tr>))}
								</tbody>
							</Table>
						</div>
					}
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ artistReducer }) => {
	return {
		artistData: artistReducer.artistData
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getArtistData: artistActions.getArtistData
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
