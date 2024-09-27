import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function SignInScreen() {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');

	const navigation = useNavigation();

	const handleSubmit = () => {
		if (email && password){
			navigation.goBack();
			navigation.navigate('Home');
		}else{

		}
	}
  return (
	<ScreenWrapper>
		<View className="flex justify-between h-full mx-4">
			<View>
				<View className="relative">
					<View className="absolute top-0 left-0 z-10">
						<BackButton/>
					</View>
					<Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
				</View>

				<View className="flex-row justify-center my-3 mt-5">
					<Image source={require('../assets/images/signup.png')} className="h-80 w-80" />
				</View>
				<View className="space-y-2 mx-2">
					<Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
					<TextInput value={email} onChangeText={value =>setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
					<Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
					<TextInput value={password} secureTextEntry onChangeText={value =>setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
				</View>
			</View>

			<View>
				<TouchableOpacity onPress={handleSubmit} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
					<Text className="text-center text-white text-lg font-bold">Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	</ScreenWrapper>
  )
}
