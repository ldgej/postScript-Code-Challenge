import axios from 'axios';
import { APIkey,setArtistData } from '../constant';

export const getArtistData = (searchArtist) => async (dispatch) => {
	await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchArtist}&api_key=${APIkey}&format=json`)
		.then((res) => res.data)
		.then((res) => { dispatch({ type: setArtistData, res }) })
		.catch((e)=>{dispatch({type:setArtistData,e})})
}

