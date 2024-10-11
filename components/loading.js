import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../theme'

export default function Loading() {
  return (
	<View className="flex-row justify-center py-8">
		<ActivityIndicator size="large" color='#50C878'></ActivityIndicator>
	</View>
  )
}
