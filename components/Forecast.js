import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Forecast() {
	return (
		<View>
			
			{/* 5 day forecast */}

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