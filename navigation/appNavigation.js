import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/user';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomScreen from '../screens/WelcomScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
	const {user} = useSelector((state)=> state.user);

	const dispatch = useDispatch();

	onAuthStateChanged(auth, u=>{
		if (u){
			console.log('got user: ', u);
			dispatch(setUser(u));
		}else{
			console.log('t ou?')
		}

	})

	if(user){
		return (
			<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
				<Stack.Screen options={{headerShown: false}} name="AddTrip" component={AddTripScreen} />
				<Stack.Screen options={{headerShown: false}} name="AddExpense" component={AddExpenseScreen} />
				<Stack.Screen options={{headerShown: false}} name="TripExpenses" component={TripExpensesScreen} />
			</Stack.Navigator>
		  </NavigationContainer>
		);
	}else{
		return (
			<NavigationContainer>
			<Stack.Navigator initialRouteName="Welcome">
				<Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomScreen} />
				<Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
				<Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignIn" component={SignInScreen} />
				<Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignUpScreen} />
			</Stack.Navigator>
		  </NavigationContainer>
		);
	}


  }


