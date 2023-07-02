import React, { useState } from 'react';
import { Image, Text, ScrollView, TextInput, View } from 'react-native';

export default function Hourly() {
	return (
		<View>
			<ScrollView 
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			fadingEdgeLength={150}
			className="flex flex-row m-4 py-4 px-3 rounded-3xl"
			style={{backgroundColor: 'rgba(255, 255, 255, 0.25)'}}>
				<View className="flex flex-row justify-center">
				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>

				<View className="flex items-center justify-center w-16">
				<Text className="text-indigo-200">time</Text>
				<Image source={require("../assets/dotIcons/icons8-cloud-50.png")}
				style={{
					resizeMode: 'cover',
					height: 50,
					width: 50,
					tintColor: 'white'
				}}/>
				<Text className="text-indigo-200 pb-3">temp</Text>
				<Text className="text-indigo-200 pb-3">wind</Text>
				<Text className="text-indigo-200">rain</Text>
				</View>
				</View>
				</ScrollView>
			</View>
		
	)
}