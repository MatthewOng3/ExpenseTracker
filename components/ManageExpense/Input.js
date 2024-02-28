import { TextInput, View, Text, StyleSheet } from "react-native";

function Input({label, textInputConfig, isValid, isLogin}){

	let inputStyles = [styles(isValid).inputContainer];
	let outerStyle = [styles(isLogin).outerContainer];

	//If label is description change text input styling
	if(textInputConfig.multiline){
		inputStyles.push(styles().inputMultiLine)
	}

	//Checks if the component is being called from the login page or manage expenses page, and push diff styles accordingly
	if(!isLogin){
		outerStyle.push({flex: 1, height: 100})
	}
	else{
		outerStyle.push({height: 50})
	}

	return(
		<View style={outerStyle}>
			<Text style={styles(isValid).label}>{label}</Text>
			<View style={inputStyles}>
				<TextInput {...textInputConfig}/>
			</View>
		</View>
	)
}

export default Input;

const styles = (isValid, isLogin) => StyleSheet.create({
	inputContainer:{
		borderRadius: 5,
		borderWidth: 1,
		marginTop: 5,
		backgroundColor: isValid ? 'white' : '#e27d7d',
		height: 30,
		padding: 6,
		marginHorizontal: 10
	},
	outerContainer:{
		width: '100%',
		marginVertical: 8
	},
	label:{
		color: isValid ? 'white' : '#c43737',
		fontSize: 12,
		marginHorizontal: 10
	},
	inputMultiLine:{
		minHeight: 60,
		textAlignVertical: 'top'
	},
})