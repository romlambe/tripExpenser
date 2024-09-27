import { View, Text, TextInput, Touchable, TouchableOpacity, TextBase } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants'

export default function AddTripScreen() {
	const [title,setTitle] = useState('');
	const [amount,setAmount] = useState('');
	const [category,setCategory] = useState('');

	const navigation = useNavigation();

	const handleAddExpense = () => {
		if (title && amount && category){
			navigation.goBack();
		}else{

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
					<Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
				</View>

				<View className="flex-row justify-center my-3 mt-5">
					<Image source={require('../assets/images/expenseBanner.png')} className="h-72 w-72" />
				</View>
				<View className="space-y-2 mx-2">
					<Text className={`${colors.heading} text-lg font-bold`}>For What?</Text>
					<TextInput value={title} onChangeText={value =>setTitle(value)} className="p-4 bg-white rounded-full mb-3" />
					<Text className={`${colors.heading} text-lg font-bold`}>How Much?</Text>
					<TextInput value={amount} onChangeText={value =>setAmount(value)} className="p-4 bg-white rounded-full mb-3" />
				</View>
				<View className="mx-2 space-x-2">
					<Text className="text-lg font-bold">Category</Text>
					<View className="flex-row flex-wrap items-center">
					{
						categories.map(cat=>{
							let bgColor = 'bg-white';
							if (cat.value==category) bgColor = 'bg-green-300'
							return (
								<TouchableOpacity onPress={()=> setCategory(cat.value)} key={cat.value}
								className={`${bgColor} rounded-full px-4 p-3 mb-2 mr-2`}>
									<Text>{cat.title}</Text>
								</TouchableOpacity>
							)
						})
					}
					</View>
				</View>
			</View>



			<View>
				<TouchableOpacity onPress={handleAddExpense} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
					<Text className="text-center text-white text-lg font-bold">Add Expense</Text>
				</TouchableOpacity>
			</View>
		</View>
	</ScreenWrapper>
  )
}
