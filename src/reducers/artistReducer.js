import { setArtistData } from '../constant';

const initialState = { artistData: { error: ' ' } }

export default (state = initialState, action) => {
	switch (action.type) {
		case setArtistData: {
			return {
				...state,
				artistData: action.res
			}
		}
		default: return state
	}
}