import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Loading } from '../components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from '../redux/slices/user'
import Snackbar from '../components/snackBar'


export default function SignInScreen() {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [snackbarVisible, setsnackbarVisible] = useState(false);
	const [snackbarMessage, setsnackbarMessage] = useState('');
	const {userLoading} = useSelector(state=>state.user);


	const navigation = useNavigation();
	const dispatch = useDispatch();


	const handleSubmit = async () => {
		setsnackbarVisible(false);
		if (email && password){
			try{
				dispatch(setUserLoading(true));
				await signInWithEmailAndPassword(auth, email, password);
				dispatch(setUserLoading(false));
			}catch(e){
				dispatch(setUserLoading(false));
				setsnackbarMessage(`${e.message}`);
				setsnackbarVisible(true);
			}
		}else{
			setsnackbarMessage('Sign in failed. Email and Password are required');
			setsnackbarVisible(true);
			// dispatch(setUserLoading(false));
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
					<Text className={`${colors.heading} text-xl font-bold text-center`}>Sign In</Text>
				</View>

				<View className="flex-row justify-center my-3 mt-5">
					<Image source={require('../assets/images/login.png')} className="h-80 w-80" />
				</View>
				<View className="space-y-2 mx-2">
					<Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
					<TextInput value={email} onChangeText={value =>setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
					<Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
					<TextInput value={password} secureTextEntry onChangeText={value =>setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
					<TouchableOpacity className="flex-row justify-end">
						<Text>Forget Password?</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View>
				{
					<TouchableOpacity onPress={handleSubmit} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
						<Text className="text-center text-white text-lg font-bold">Sign In</Text>
					</TouchableOpacity>
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

