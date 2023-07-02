import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Forecast() {
	return (
		<View>
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
	)
}