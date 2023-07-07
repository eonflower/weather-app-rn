import axios from "axios";
import {WEATHER_API_KEY, WEATHER_API_URL} from '@env'

const forecastEndpoint = params => 
`${WEATHER_API_URL}forecast.json?key=${WEATHER_API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`


const locationsEndpoint = params => 
`${WEATHER_API_URL}search.json?key=${WEATHER_API_KEY}&q=${params.cityName}`

// const currentLocationEndpoint = params => 
// `${WEATHER_API_URL}forecast.json?key=${WEATHER_API_KEY}&q=${params.lat},${params.lon}&days=${params.days}&aqi=no&alerts=no`





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

// export const fetchCurrentLocation = params => {
// 	return apiCall(currentLocationEndpoint(params))
// }