import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {MagnifyingGlassIcon, CalendarDaysIcon} from "react-native-heroicons/outline"
import {MapPinIcon} from "react-native-heroicons/solid"
import Hourly from '../components/Hourly';
import Forecast from '../components/Forecast';
import {debounce} from "lodash"
import { fetchLocations, fetchWeatherForecast } from '../api/weather';




export default function HomeScreen() {
	const [showSearch, toggleSearch] = useState(false)
	const [locations, setLocations] = useState([])

	
	const handleSearch = value => {
		if(value.length > 2){
			fetchLocations({cityName: value}).then(data => {
				setLocations(data)
			})
		}
		
	}

	const handleLocation = (place) => {
		console.log("location: ", place)
		setLocations([])
		fetchWeatherForecast({
			cityName: place.name,
			days: '3'
		}).then(data =>{
			console.log('the forecast is: ', data)
		})
	}

	

	const handleTextDebounce = useCallback(debounce(handleSearch, 1000), [])

  return (
    <View className="flex-1 relative">
			<Image source={require('../assets/bg.png')}
			className='absolute h-full w-full'
			blurRadius={80}
			/>
			<View className='flex flex-1'>
			<View className='mt-10 mx-4 relative z-50'>
				<View className='flex-row justify-end items-center rounded-full'
				style={{backgroundColor: showSearch? 'rgba(255, 255, 255, 0.25)': "transparent"}}>
					{
					showSearch ? (
						<TextInput
						onChangeText={handleTextDebounce}
						className='pl-6 h-10 flex-1 text-base text-gray-200' 
						placeholder='Search city' 
						placeholderTextColor={'#95b8d6'}/>
					):null
					}
					
					<TouchableOpacity 
					onPress={() => toggleSearch(!showSearch)}
					style={{backgroundColor: "rgba(255, 255, 255, 0.30)"}}
					className='rounded-full p-3 m-1'>
						<MagnifyingGlassIcon size='20' color="#356388"/>
					</TouchableOpacity>
				</View>
				{
				locations.length > 0 && showSearch? (
					<View className='absolute w-full bg-gray-100 top-16 rounded-3xl'>
						{locations.map((place, index) =>{
							let showBorder = index + 1 != locations.length;
							let borderClass = showBorder? 'border-b-2 border-b-gray-200': "";
							return (
								<TouchableOpacity
								key={index}
								className={`flex-row items-center border-0 p-3 mb-1 ${borderClass}`}
								onPress={() => handleLocation(place)}>
									<MapPinIcon size="18" color="#356388" />
									<Text className='pl-3'>{place?.name}, {place?.country === "United States of America" ? place?.region : place?.country}</Text>
								</TouchableOpacity>
							)
						})}
						</View>
						):null
				}
			</View>

			{/* daily forecast */}
			<View className="flex flex-row gap-24 pt-4 pl-8">
			<View className="flex">
				<View className="pb-4">
					<Text className="text-7xl text-indigo-200">
						85°
					</Text>
					<Text className="text-lg leading-none text-indigo-200">
						Sunny
					</Text>
				</View>

				<View className="">
					<Text className="">
					<MapPinIcon size='15' color="#5a82bf" />
					<Text className="text-2xl text-indigo-200">
						Portland
					</Text>
					</Text>
					<Text className="text-xs text-indigo-200">
						Min / Max ~ Feels like
					</Text>
				</View>
			</View>
			<View className="">
				<Image 
				className="" 
				source={require("../assets/dotIcons/icons8-sun-100.png")}
				style={{
					resizeMode: 'cover',
					height: 100,
					width: 100,
					tintColor: 'white'
				}}/>
			</View>
			</View>

			<View className="flex pt-10 items-center justify-center">
				<Text className="flex border-b-2 border-dotted border-b-indigo-200 p-2 text-lg text-indigo-200">
					today's weather
				</Text>
			</View>
			<Hourly />

			{/* 3 day forecast */}
			
			<View className="flex items-center justify-center">
				<Text className="flex border-b-2 border-dotted border-b-indigo-200 p-2 text-lg text-indigo-200">
					3 day forecast
				</Text>
			</View>
			
			<View 
			className="flex flex-column m-4 pb-4 p-4 justify-between rounded-3xl"
			style={{backgroundColor: 'rgba(255, 255, 255, 0.25)'}}>
				<View className="flex flex-row justify-between items-end pb-2">
					<Text style={{width: 70}}>today</Text>
					<View className="flex flex-row items-end gap-1">
					<Image source={require("../assets/dotIcons/icons8-wind-50.png")}
				style={{
					height: 20,
					width: 25,
					alignItems: 'flex-end',
					tintColor: 'white'
				}}/>
					<Text className="">wind</Text>
					</View>
					<View className="flex flex-row items-end gap-1">
					<Image source={require("../assets/dotIcons/icons8-wet-50.png")}
				style={{
					height: 20,
					width: 25,
					alignItems: 'flex-end',
					tintColor: 'white'
				}}/>
					<Text className="">rain</Text>
					</View>
					<Text className="">low</Text>
					<Text className="">high</Text>
				</View>

				<View className="flex flex-row justify-between items-end pb-2">
				<Text style={{width: 70}}>tomorrow</Text>
					<View className="flex flex-row items-end gap-1">
					<Image source={require("../assets/dotIcons/icons8-wind-50.png")}
				style={{
					height: 20,
					width: 25,
					alignItems: 'flex-end',
					tintColor: 'white'
				}}/>
					<Text className="">wind</Text>
					</View>
					<View className="flex flex-row items-end gap-1">
					<Image source={require("../assets/dotIcons/icons8-wet-50.png")}
				style={{
					height: 20,
					width: 25,
					alignItems: 'flex-end',
					tintColor: 'white'
				}}/>
					<Text className="">rain</Text>
					</View>
					<Text className="">low</Text>
					<Text className="">high</Text>
				</View>

				<View className="flex flex-row justify-between items-end pb-2">
				<Text style={{width: 70}}>next day</Text>
					<View className="flex flex-row items-end gap-1">
					<Image source={require("../assets/dotIcons/icons8-wind-50.png")}
				style={{
					height: 20,
					width: 25,
					alignItems: 'flex-end',
					tintColor: 'white'
				}}/>
					<Text className="">wind</Text>
					</View>
					<View className="flex flex-row items-end gap-1">
					<Image source={require("../assets/dotIcons/icons8-wet-50.png")}
				style={{
					height: 20,
					width: 25,
					alignItems: 'flex-end',
					tintColor: 'white'
				}}/>
					<Text className="">rain</Text>
					</View>
					<Text className="">low</Text>
					<Text className="">high</Text>
				</View>
			</View>

			</View>
		</View>
  );
}


