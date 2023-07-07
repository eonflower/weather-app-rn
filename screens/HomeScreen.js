import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {MagnifyingGlassIcon, CalendarDaysIcon} from "react-native-heroicons/outline"
import {MapPinIcon} from "react-native-heroicons/solid"
import Hourly from '../components/Hourly';
import Forecast from '../components/Forecast';
import {debounce} from "lodash"
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import {format, addDays} from 'date-fns'
import { weatherImages, weatherData } from '../constants';
import { storeData, getData } from '../utils/asyncStorage';




export default function HomeScreen() {
	const [showSearch, toggleSearch] = useState(false)
	const [locations, setLocations] = useState([])
	const [weather, setWeather] = useState({})
	const [loading, setLoading] = useState(false)

	const textColor = weather?.current?.is_day === 1? "text-gray-200 border-b-gray-200" : "text-indigo-200 border-b-indigo-200"
	const tintColor = weather?.current?.is_day === 1? "#E5E7EB" : "#C7D2FE"
	
	
	const handleSearch = value => {
		if(value.length > 2){
			fetchLocations({cityName: value}).then(data => {
				setLocations(data)
			})
		}
		
	}

	const handleLocation = place => {
		// console.log("location: ", place)
		setLocations([])
		setLoading(false)
		toggleSearch(false)
		fetchWeatherForecast({
			cityName: place.name,
			days: '7'
		}).then(data =>{
			setWeather(data)
			setLoading(false)
			storeData('city', place.name)
			
		})
	}

	const roundNumber = number => {
		return Math.round(number);
	}

	
	useEffect(() => {
		fetchMyWeatherData()
	}, [])

	const fetchMyWeatherData = async() => {
		// console.log(weather?.location?.localtime)
		let myCity = await getData('city');
		let cityName = "Portland"
		if(myCity){
			cityName = myCity;
		}

		fetchWeatherForecast({
			cityName,
			days: '7'
		}).then(data => {
			setWeather(data)
		})
	}


	

	

	const handleTextDebounce = useCallback(debounce(handleSearch, 600), [])



  return (
    <View className="flex-1 relative">
			<Image 
				source={weather?.current?.is_day === 1? 
				weatherData[weather?.current?.condition?.code]?.bg :
				require('../assets/backgrounds/night.jpg')}
			className='absolute h-full w-full'
			blurRadius={30}
			/>
			{
				loading? (
					<View className="flex flex-1 justify-center items-center">
						<Text className={`${textColor} text-2xl"`}>Loading...</Text>
					</View>
				):(
					
			<View className='flex flex-1'>
			<View className='mt-10 mx-4 relative z-50'>
				<View className='flex-row justify-end items-center rounded-full'
				style={{backgroundColor: showSearch? 'rgba(30, 30, 30, 0.65)': "transparent"}}>
					{
					showSearch ? (
						<TextInput
						onChangeText={handleTextDebounce}
						className={`pl-6 h-10 flex-1 text-base ${textColor}`}
						placeholder='Search city' 
						placeholderTextColor={"#bababa"}/>
					):null
					}
					
					<TouchableOpacity 
					onPress={() => toggleSearch(!showSearch)}
					style={{backgroundColor: "rgba(30, 30, 30, 0.65)"}}
					className='rounded-full p-3 m-1'>
						<MagnifyingGlassIcon size='20' color={"#bababa"}/>
					</TouchableOpacity>
				</View>
				{
					locations.length > 0 && showSearch? (
						<View className='absolute w-full top-16 rounded-3xl'
						style={{backgroundColor: "rgba(30, 30, 30, 1)"}}>
							{locations.map((place, index) =>{
								let showBorder = index + 1 != locations.length;
								let borderClass = showBorder? 'border-b-2 border-b-gray-600': "";
								return (
									<TouchableOpacity
									key={index}
									className={`flex-row items-center text-gray-200 border-0 p-3 mb-1 ${borderClass}`}
									onPress={() => handleLocation(place)}>
										<MapPinIcon size="18" color="#356388" />
										<Text className='pl-3 text-gray-200'>{place?.name}, {place?.country === "United States of America" ? place?.region : place?.country}</Text>
									</TouchableOpacity>
								)
							})
						}
						</View>
					):null
				}
			</View>

			{/* Daily forecast // Plan to split into its own component */}
			
						<View>
							<View 
								className="flex flex-row pt-6 pl-8"
								style={{gap: 70}}>
								<View className="flex">
									<View className="pb-4">
									<Text className={`text-7xl ${textColor}`}>
											{roundNumber(weather?.current?.temp_f)}°
										</Text>
										<Text className={`text-lg leading-none ${textColor}`}>
											{weather?.current?.condition?.text}
										</Text>
									</View>

									<View className="flex">
										<Text className="pb-1">
										<Text className={`text-2xl ${textColor}`}>
											{weather?.location?.name}
										</Text>
										</Text>
										<Text className={`text-xs ${textColor}`}>
											{roundNumber(weather?.forecast?.forecastday[0].day?.mintemp_f)}° /  
											{roundNumber(weather?.forecast?.forecastday[0].day?.maxtemp_f)}° ~ 
											Feels like {roundNumber(weather?.current?.feelslike_f)}°
										</Text>
											
										{/* <Text className={`text-xs ${textColor}`}>
											Local time {format(new Date(weather?.location?.localtime), "h:mmaaa")}
										</Text> */}
									</View>
								</View>
								<View className="flex absolute right-6 top-12">
									<Image 
									source={weather?.current?.is_day === 1? 
										weatherData[weather?.current?.condition?.code]?.icon :
										weather?.current?.condition?.text === "Clear"? 
										require('../assets/WEATHER2/night.png') :
										weatherData[weather?.current?.condition?.code]?.icon
									} 
									style={{
										resizeMode: 'contain',
										height: 100,
										width: 150,
									}}/>
								</View>
								</View>

								<View className="flex pt-3 items-center justify-center">
									<Text className={`flex border-b-2 border-dotted p-2 text-lg ${textColor}`}>
										today's hourly
									</Text>
								</View>
								</View>
					

			<View>
				
				{/* Hourly // Plan to split into its own component */}

			<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			fadingEdgeLength={150}
			className="flex flex-row m-4 py-4 pr-6 rounded-3xl"
			style={{backgroundColor: 'rgba(30, 30, 30, 0.85)'}}>

				{
					weather?.forecast?.forecastday[0]?.hour?.map((item, index) => {
						// const currentTime = format(new Date(weather?.location?.localtime), 'k')
						// const time = format(new Date(item.time), 'k')
						const formattedTime = format(new Date(item.time), 'haaa')
						// console.log(time)
						
						return (
							<View className="flex flex-row justify-center">
							<View
								key={index}
								className="flex items-center justify-center"
								style={{width: 70}}>
							<Text className={`${textColor} font-bold pb-1`}>{!loading? formattedTime: ""}</Text>
							<Image 
								source={item.is_day === 1? 
								weatherData[weather?.current?.condition?.code]?.icon :
								item.condition?.text === "Clear"? 
								require('../assets/WEATHER2/night.png') :
								weatherData[item.condition?.code]?.icon
							}
							style={{
								resizeMode: 'contain',
								height: 30,
								width: 50,

							}}/>
							<Text className={`text-base ${textColor} pb-3`}>{roundNumber(item.temp_f)}°</Text>
							<View className="flex flex-row items-end gap-1">
							<Image source={require("../assets/dotIcons/icons8-wet-50.png")}
						style={{
							resizeMode: 'contain',
							height: 15,
							width: 15,
							alignItems: 'flex-end',
							tintColor: tintColor
						}}/>
							<Text className={`text-xs ${textColor}`}>{roundNumber(item.chance_of_rain)}%</Text>
							</View>
							<View className="flex flex-row items-end gap-1">
							<Image source={require("../assets/dotIcons/icons8-wind-50.png")}
						style={{
							resizeMode: 'contain',
							height: 15,
							width: 15,
							alignItems: 'flex-end',
							tintColor: tintColor
						}}/>
							<Text className={`text-xs ${textColor}`}>{roundNumber(item.gust_mph)}mph</Text>
							</View>
							</View>
							</View>
						)
					})
						
				}

				</ScrollView>

			</View>

			{/* 7 day forecast // Plan to split into its own component */}
			
			<View className="flex items-center justify-center">
				<Text className={`flex border-b-2 border-dotted pb-2 mb-4 text-lg ${textColor}`}>
					7 day forecast
				</Text>
			</View>

			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				className="flex gap-3">
				
			{
				weather?.forecast?.forecastday?.map((item, index) => {
					const correctDate = addDays(new Date(item.date), 1)
					const dayName = format(new Date(correctDate), 'iiii')

					return (
						<View 
						key={index}
						className="flex items-center w-32 mb-8 p-4 mx-2 space-y-1 rounded-3xl"
						style={{backgroundColor: 'rgba(30, 30, 30, 0.85)', height: 150}}>
							<Text className={`font-bold ${textColor}`}>{dayName}</Text>
							<View className="flex flex-row items-end">
							<Image 
								source={weatherData[item?.day?.condition?.code].icon}
								style={{
								resizeMode: 'contain',
								height: 20,
								width: 20,
						}}/>
							<Text className={textColor}>{roundNumber(item?.day?.mintemp_f)}° / {roundNumber(item?.day?.maxtemp_f)}°</Text>
								</View>
							<View className="flex flex-row items-end gap-1">
							<Image source={require("../assets/WEATHER2/sunrise.png")}
								style={{
								resizeMode: 'contain',
								height: 30,
								width: 30,
						}}/>
							<Text className={textColor}>{item.astro.sunrise.toLowerCase()}</Text>
							</View>
							<View className="flex flex-row items-end gap-1">
							<Image source={require("../assets/WEATHER2/sunset.png")}
								style={{
								resizeMode: 'contain',
								height: 30,
								width: 30,
						}}/>
							<Text className={textColor}>{item.astro.sunset.toLowerCase()}</Text>
							</View>
						</View>
						
					)
				})
			}
			
			</ScrollView>
			</View>
				)
			}
		</View>
  )
}


