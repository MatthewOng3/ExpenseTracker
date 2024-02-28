import AuthContent from "../components/Authentication/AuthContent";
import ScreenTemplate from "../components/ScreenTemplate";
import { Alert, StyleSheet } from "react-native";
import LoadingOverlay from "../components/LoadingOverlay";
import { useState, useContext } from "react";
import { login } from "../util/authenticate";
import { AuthContext } from "../context/auth-context";

/*Component for Login Screen*/
function LoginScreen(){

	const [isAuthenticating, setIsAuthenticating] = useState(false) //manage loading state
	const authCtx = useContext(AuthContext)

	async function loginHandler({email, password}){
		try{
			//Send request to back end
			setIsAuthenticating(true)
			const token = await login(email, password)
			authCtx.authenticate(token)
		}
		catch(error){
			Alert.alert('Authentication failed', 'Could not log you in!')
			setIsAuthenticating(false)
		}
	}

	//Display loading spinner if loading state is true
	if(isAuthenticating){
		return <LoadingOverlay/>
	}

	return(
		<ScreenTemplate>
			<AuthContent isLogin={true} onAuthenticate={loginHandler}/>
		</ScreenTemplate>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	rootContainer:{
		justifyContent: 'center',
		alignItems: 'center'
	}
})
