import AuthContent from "../components/Authentication/AuthContent";
import ScreenTemplate from "../components/ScreenTemplate";
import { createUser } from "../util/authenticate";
import { useState, useContext } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../context/auth-context";

function SignUpScreen({navigation}){

	const [isLoading, setIsLoading] = useState(false) //manage loading state
	const authCtx = useContext(AuthContext);

	async function signUpHandler({email, password}){
		try{
			//Send request to back end
			setIsLoading(true)
			const token = await createUser(email, password)
			authCtx.authenticate(token)
			navigation.navigate('Login') //Navigate back to login screen once succesfully signed up
		}
		catch(error){
			Alert.alert('Authentication failed', 'Could not create a new user!')
			setIsLoading(false)
		}
		
	}

	//Display loading spinner if loading state is true
	if(isLoading){
		return <LoadingOverlay/>
	}
	
	return(
		<ScreenTemplate>
			<AuthContent onAuthenticate={signUpHandler} isLogin={false}/>
		</ScreenTemplate>
	)
}

export default SignUpScreen;