import { View, StyleSheet, Button, ImageBackground } from "react-native";
import Input from "../ManageExpense/Input";
import { useState } from "react";
import SignInButton from "./UI/SignInButton";


function AuthForm({isLogin, onSubmit, credentialsValid}){
	
	//States to handle entered emails and passwords
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

	//Update input values
	function updateInputValue(type, enteredValue){
		if(type === 'email'){
			setEnteredEmail(enteredValue)
		}
		else if(type === 'confirmEmail'){
			setEnteredConfirmEmail(enteredValue)
		}
		else if(type === 'password'){
			setEnteredPassword(enteredValue)
		}
		else if(type === 'confirmPassword'){
			setEnteredConfirmPassword(enteredValue)
		}
	}
	
	//Submit credentials
	function submitHandler(){
		const credentials = {
			email: enteredEmail,
			confirmEmail: enteredConfirmEmail,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword
		}
		onSubmit(credentials)
	}

	return(
		<View style={styles.inputContainer}>
			<Input label='Email' textInputConfig={{
			value: enteredEmail,
			keyboardType: "email-address",
			autoCapitalize: 'none',
			autoCorrect: 'off',
			onChangeText: updateInputValue.bind(this, 'email')
			}} isValid={credentialsValid.email} isLogin={true}/>
			{!isLogin && (
				<Input label='Confirm Email' textInputConfig={{
					value: enteredConfirmEmail,
					keyboardType: "email-address",
					autoCapitalize: 'none',
					autoCorrect: 'off',
					onChangeText: updateInputValue.bind(this, 'confirmEmail')
				}} isValid={credentialsValid.confirmEmail} isLogin={true}/>
			)}
			<Input label='Password' textInputConfig={{
			value: enteredPassword,
			onChangeText: updateInputValue.bind(this, 'password')
			}} isValid={credentialsValid.password} isLogin={true}/>
			{!isLogin && (
				<Input label='Confirm Password' textInputConfig={{
					value: enteredConfirmPassword,
					onChangeText: updateInputValue.bind(this, 'confirmPassword')
				}} isValid={credentialsValid.confirmPassword} isLogin={true}/>
			)}
			<View style={styles.authenticationButton}>
				<SignInButton onPress={submitHandler}>{isLogin ? 'Log In' : 'Sign Up'}</SignInButton>
			</View>
		</View>
	)
}

export default AuthForm;

const styles = StyleSheet.create({
	inputContainer:{
		flex: 1
	},
	authenticationButton:{
		flex: 1,
		justifyContent: 'flex-end'
		
	}
})