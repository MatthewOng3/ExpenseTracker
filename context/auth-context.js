import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
})

function AuthContextProvider({children}){
	const [authToken, setAuthToken] = useState();

	function authenticate(token){
		setAuthToken(token)
		AsyncStorage.setItem('token', token) //Store token item data on device
	}

	function logout(){
		setAuthToken(null)
	}
	
	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout
	}

	return(
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	)
}

export default AuthContextProvider;