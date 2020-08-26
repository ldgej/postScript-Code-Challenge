export const add = () => {
	return {
		type: 'add',
	}
}

export const previewMessage = (campaign) => {
	let id = campaign.id;
	return { type: 'addToPreview', id, campaign }
}

export const createPreview=(campaign)=>{
	return { type: 'createPreview',campaign}
}
