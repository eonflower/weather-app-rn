import React, { useState } from 'react';
import { Image, Text, ScrollView, TextInput, View } from 'react-native';

export default function Hourly() {
	return (
		<View>

			{/* Hourly forecast */}
				
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
		
	)
}