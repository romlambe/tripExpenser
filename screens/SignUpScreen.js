import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../config/firebase'
import { setUserLoading } from '../redux/slices/user'
import Snackbar from '../components/snackBar'

export default function SignUpScreen() {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const {userLoading} = useSelector(state=>state.user);
	const [snackbarVisible, setsnackbarVisible] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const handleSubmit = async () => {
		setsnackbarVisible(false);
		if (email && password){
			// navigation.goBack();
			// navigation.navigate('Home');
			try{
				dispatch(setUserLoading(true));
				await createUserWithEmailAndPassword(auth, email, password)
				dispatch(setUserLoading(false));
			}catch(e){
				dispatch(setUserLoading(false));
				setsnackbarMessage("Error: y'a une erreur");
				setsnackbarVisible(true);
			}
		}else{
			setsnackbarMessage('Sign in failed. Email and Password are required');
			setsnackbarVisible(true);
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
				{
					<TouchableOpacity onPress={handleSubmit} style={{backgroundColor: colors.button}} className="my-16 rounded-full p-3 shadow-sm mx-2">
						<Text className="text-center text-white text-lg font-bold">Sign Up</Text>
					</TouchableOpacity>
				}
			</View>
			{snackbarVisible && (
          <Snackbar
            message={snackbarMessage}
            onActionPress={() => setsnackbarVisible(false)}
            position="bottom"
            backgroundColor="#2E67F8"
            textColor="white"
            actionTextColor="white"
            containerStyle={{ marginHorizontal: 12 }}
          />
        )}
		</View>
	</ScreenWrapper>
  )
}
