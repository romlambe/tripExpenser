import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import Snackbar from '../components/snackBar'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { addDoc } from 'firebase/firestore'

export default function AddTripScreen() {
	const [place,setPlace] = useState('');
	const [country,setCountry] = useState('');
	const [loading, setLoading] = useState(false);
	const [snackbarVisible, setsnackbarVisible] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');
	const {user} = useSelector(state=>state.user);

	const navigation = useNavigation();

	const handleAddTrip = async() => {
		if (place && country){
			// navigation.navigate('Home');
			setLoading(true);
			let doc = await addDoc(tripsRef, {
				place,
				country,
				userId: user.uid,
			})
			setLoading(false);
			if (doc && doc.id){
				navigation.goBack();
			}
		}else{
			setsnackbarMessage('Place and Country are required');
			setsnackbarVisible(true);
		}
	}
  return (
	<ScreenWrapper>
		<View className="flex justify-between h-full mx-4">
			<View>
				<View className="relative mt-5">
					<View className="absolute top-0 left-0 z-10">
						<BackButton/>
					</View>
					<Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
				</View>

				<View className="flex-row justify-center my-3 mt-5">
					<Image source={require('../assets/images/4.png')} className="h-72 w-72" />
				</View>
				<View className="space-y-2 mx-2">
					<Text className={`${colors.heading} text-lg font-bold`}>Where On Earth</Text>
					<TextInput value={place} onChangeText={value =>setPlace(value)} className="p-4 bg-white rounded-full mb-3" />
					<Text className={`${colors.heading} text-lg font-bold`}>Which Country</Text>
					<TextInput value={country} onChangeText={value =>setCountry(value)} className="p-4 bg-white rounded-full mb-3" />
				</View>
			</View>

			<View>
				{
					loading? (
						<Loading/>
					):(
						<TouchableOpacity onPress={handleAddTrip} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
							<Text className="text-center text-white text-lg font-bold">Add Trip</Text>
						</TouchableOpacity>)
				}
			</View>
			{snackbarVisible && (
			<Snackbar
            	message={snackbarMessage}
            	onActionPress={() => setsnackbarVisible(false)}
            	containerStyle={{ marginHorizontal: 12 }}
          	/>
			)}
		</View>
	</ScreenWrapper>
  )
}
