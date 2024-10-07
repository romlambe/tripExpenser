import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../theme'

export default function Loading() {
  return (
	<View className="flex-row justify-center">
		<ActivityIndicator size="large" color={colors.button}></ActivityIndicator>
	</View>
  )
}
