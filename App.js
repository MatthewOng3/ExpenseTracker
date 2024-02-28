import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/IconButton';
import ManageExpenses from './screens/ManageExpenses';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpensesContextProvider from './context/expenses-context';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthContextProvider, { AuthContext } from './context/auth-context';
import { useContext, useEffect, useState } from 'react';
import LogoutButton from './components/Authentication/UI/LogoutButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'	


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); //create Tab object

/*Main Screen with bottom tabs*/
function ExpensesOverview(){
	const authCtx = useContext(AuthContext)

	return(
		<Tab.Navigator screenOptions={({navigation}) => ({
			headerRight: () => {return(<IconButton name='add' size={30} color='white' onPress={()=>{navigation.navigate('Manage Expenses')}}/>)},
			headerLeft: () => {return(<LogoutButton onPress={authCtx.logout}/>)},
			headerTintColor: '#ffffff',
			headerTransparent: false,
			headerStyle: {backgroundColor: '#595656'},
			headerRightContainerStyle: {marginLeft: -15, paddingRight:10},
			})}>
			<Tab.Screen name='Recent Expenses' component={RecentExpenses} options={{tabBarIcon: ({size}) => (<Ionicons size={size} name='bar-chart'/>)}}/>
			<Tab.Screen name='All Expenses' component={AllExpenses} options={{tabBarIcon: ({size}) => (<Ionicons size={size} name='calendar'/>)}}/>
		</Tab.Navigator>
	)
}

/*Screens that need authenticating*/
function AuthStack(){
	return(
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Sign Up Screen' component={SignUpScreen}/>
		</Stack.Navigator>
	)
}

/*Main Screen with bottom tabs and manage expenses screen*/
function AuthenticatedMain(){
	return(
		<Stack.Navigator>
			<Stack.Screen name='Expenses Overview' component={ExpensesOverview} options={{headerShown: false}}/>
			<Stack.Screen name='Manage Expenses' component={ManageExpenses} options={{presentation: 'modal', headerStyle: {backgroundColor: '#595656'}}}/>
		</Stack.Navigator>
	)
}

function Main(){
	const authCtx = useContext(AuthContext)
	
	return(
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack/>}
			{authCtx.isAuthenticated && <AuthenticatedMain/>}
		</NavigationContainer>
	)
}

/*Root component */
function Root(){
	const [isTryingLogin, setIsTryingLogin] = useState(true)
	const authCtx = useContext(AuthContext)

	//Fetch token for auto log in
	useEffect(()=>{

		async function fetchToken(){
			const storedToken = await AsyncStorage.getItem('token')

			if(storedToken){
				authCtx.authenticate(storedToken);
			}

			setIsTryingLogin(false)
		}

		fetchToken()
	},[])

	//Delays the splash screen if still logging in 
	if(isTryingLogin){
		return <AppLoading/>
	}

	return <Main/>
}

export default function App() {
	
  return (
	<>
		<StatusBar style='light'/>
		<ExpensesContextProvider>
			<AuthContextProvider>
				<Root/>
			</AuthContextProvider>
		</ExpensesContextProvider>
	</>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
