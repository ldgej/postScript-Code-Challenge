import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

export const Content = (props) => {
	const { showData } = props;
	return (
		<div className='rightContent'>
			{showData && showData.map((item, index) => {

				return <Card className='card border border-primary m-3' key={index}>
					{item.media && <CardImg className='w-25 m-1' src={item.media} alt="Card image cap" />}
					<CardBody>
						<CardTitle><h5>Campaign Name :</h5></CardTitle>
						<CardText>{item.name}</CardText>

						<CardTitle><h5>{item.stats ? 'Stats' : 'Segment:'}</h5></CardTitle>
						<CardText>{item.stats ? 'sent' : 'name'} :<span>{item.stats ? item.stats.sent : item.segment.name}</span><br />
						{item.stats ? 'clicked count' : 'subscribers count'} :	<span>{item.stats ? item.stats.clicked : item.segment.subscribers_count}</span>
						</CardText>

						<CardTitle><h6>Message :</h6></CardTitle>
						<CardText>{item.text}</CardText>

						{!item.stats && <Link to={`/detail/${item.id}`}><Button color='primary'>Edit</Button></Link>}
					</CardBody>

				</Card>
			})}
		</div>
	)
}