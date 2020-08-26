import React, { useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useHistory } from "react-router-dom";

export const Menu = (props) => {
	const [activeArray, setAvtiveArray] = useState([])
	const { viewshowData } = props;
	let history = useHistory();
	const handleViewsent = (param) => {
		viewshowData(param);
		setAvtiveArray([param])
	}
	const createNewCampaign = () => {
		history.push(`/new`);
	}
	return (
		<div className='leftMenu'>
			<Nav pills>
				<NavItem className='navItem'>
					<NavLink data-test='navLink' href='#' active={activeArray.includes('unSent')} onClick={() => { handleViewsent('unSent') }}>UnSent</NavLink>
				</NavItem>
				<NavItem className='navItem'>
					<NavLink data-test='navLink' href='#' active={activeArray.includes('sent')} onClick={() => { handleViewsent('sent') }}>Sent</NavLink>
				</NavItem>
				<NavItem className='navItem'>
					<NavLink href='#' active={activeArray.includes('new')} onClick={() => { createNewCampaign('new') }}>New</NavLink>
				</NavItem>

			</Nav>
		</div>
	)
}
