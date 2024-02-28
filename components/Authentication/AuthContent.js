import { View, StyleSheet, Alert } from "react-native";
import AuthForm from "./AuthForm";
import FlatButton from "./UI/FlatButton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function AuthContent({isLogin, onAuthenticate}){
	const navigation = useNavigation();	//navigation hook

	let screenstyle = [styles.authContainer, styles.loginDimensions]

	//Change dimensions of the auth content container based on sign up or login page
	if(!isLogin){
		screenstyle = [styles.authContainer, styles.signUpDimensions]
	}
	
	//State that checks if credentials are valid
	const [credentialsValid, setCredentialsValid] = useState({
		email: true,
		password: true,
		confirmEmail: true,
		confirmPassword: true,
	});
	
	function submitCredentials(credentials){
		let { email, confirmEmail, password, confirmPassword } = credentials;
		
		email = email.trim();
    	password = password.trim();	

		//Checks if credentials entered are valid
		const emailIsValid = email.includes('@')
		const passwordIsValid = password.length > 6 //Firebase requires passwords that are 6 characters long
		const emailsAreEqual = email === confirmEmail
		const passwordsAreEqual = password === confirmPassword
	
		//Raise alerts if any of the credentials are invalid
		if(!emailIsValid || !passwordIsValid || (!isLogin && (!emailsAreEqual || !passwordsAreEqual))){
			Alert.alert('Invalid input', 'Please check your entered credentials.');
			setCredentialsValid({
				email: emailIsValid,
				password: passwordIsValid,
				confirmEmail: emailsAreEqual,
				confirmPassword: passwordsAreEqual
			})
			return;
		}
		onAuthenticate({email, password})
	}

	function switchAuthScreen(){
		
		if(isLogin){
			navigation.replace('Sign Up Screen')
		}
		else{
			navigation.replace('Login')
		}
	}

	return(
		<View style={screenstyle}>
			<AuthForm isLogin={isLogin} onSubmit={submitCredentials} credentialsValid={credentialsValid}/>
			<View style={styles.bottomButton}>
				<FlatButton onPress={switchAuthScreen}>
					{isLogin ? 'Create a new user' : 'Log in instead'}
				</FlatButton>
			</View>
		</View>
	)
}

export default AuthContent;

const styles = StyleSheet.create({
	authContainer:{
		marginTop: 64,
		marginHorizontal: 38,
		padding: 12,
		borderRadius: 8,
		backgroundColor: 'grey',
		elevation: 2,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.35,
		shadowRadius: 4,
		width: 300,
	},
	loginDimensions:{
		height: 250,
	},
	signUpDimensions:{
		height: 380,
	},
	bottomButton:{
		justifyContent: 'flex-end',
	}
})