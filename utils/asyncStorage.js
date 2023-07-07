import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue);
		console.log(value + " stored")
	} catch (error) {
		console.log("There was an error storing: ", error)
	}
}

export const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (error) {
		console.log("There was an error retrieving: ", error)
	}
}
