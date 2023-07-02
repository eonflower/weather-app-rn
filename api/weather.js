import axios from "axios";
import {API_KEY, API_URL} from '@env'

const forecastEndpoint = params => 
`${API_URL}forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`


const locationsEndpoint = params => 
`${API_URL}search.json?key=${API_KEY}&q=${params.cityName}`

const apiCall = async (endpoint) => {
	const options = {
		method: 'GET',
		url: endpoint
	}
	try {
		const res = await axios.request(options);
		return res.data;
	} catch(err) {
		console.log('error: ', err);
		return null;
	}
}

export const fetchWeatherForecast = params => {
	return apiCall(forecastEndpoint(params))
}

export const fetchLocations = params => {
	return apiCall(locationsEndpoint(params))
}