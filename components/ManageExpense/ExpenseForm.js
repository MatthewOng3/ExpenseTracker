import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import { getExistingDate } from "../../util/FormatDate";
import ButtonContainer from "../ButtonContainer";

function ExpenseForm({defaultValues, isEditing, onSubmit, cancel}){
	
	//State to manage input values 
	const [inputs, setInputs] = useState({
		amount: {value: defaultValues ? defaultValues.amount.toString() : '',
				isValid: true},
		date: {value: defaultValues ? getExistingDate(defaultValues.date) : '',
				isValid: true},
		title: {value: defaultValues ? defaultValues.title : '',
				isValid: true}
	});
	
	//enteredValue auto passed in by react native
	function inputChange(inputIdentifier, enteredValue){
		
		//updating state based on previous state, which is currInputValues
		setInputs((currInputs)=>{  
			return {
				...currInputs,
				[inputIdentifier]: {value: enteredValue, isValid: true} //set and target a property dynamically
			};
		});
	}
	
	//Calling on submit prop function
	function submit(){
		
		//Check amount
		const amountIsValid = !isNaN(inputs.amount.value) && inputs.amount.value > 0;
	
		//Check date
		const dateIsValid = new Date(inputs.date.value) !== 'Invalid Date' 

		//Check title
		const titleIsValid = inputs.title.value !== ''

		//Validation check
		if (!amountIsValid || !dateIsValid || !titleIsValid){
			setInputs((currInputs)=>{
				return{
					amount: { value: currInputs.amount.value, isValid: amountIsValid},
					date: { value: currInputs.date.value, isValid: dateIsValid},
					title: { value: currInputs.title.value, isValid: titleIsValid}
				};
			});
			return;
		}
	
		onSubmit({amount: inputs.amount.value, date: inputs.date.value, title: inputs.title.value})
	}
	
	//True if one of the isValid property is false
	const formValid = inputs.amount.isValid && inputs.date.isValid && inputs.title.isValid

	return(
		<View style={styles.rootContainer}>
			<View style={styles.upperContainer}>
				<Input label='Amount' textInputConfig={{
					keyboardType: 'decimal-pad',
					onChangeText: inputChange.bind(this, 'amount'), //auto pass in amount key
					value: inputs.amount.value
				}} isValid={inputs.amount.isValid} isLogin={false}/>
				<Input label='Date' textInputConfig={{
					placeholder: 'YYYY-MM-DD',
					maxLength: 10,
					onChangeText: inputChange.bind(this, 'date'),
					value: inputs.date.value
				}} isValid={inputs.date.isValid} isLogin={false}/>
			</View>
			<Input label='Description' textInputConfig={{
				multiline: true,
				onChangeText: inputChange.bind(this, 'title'),
				value: inputs.title.value
			}} isValid={inputs.title.isValid} isLogin={false}/>
			{!formValid && (
				<Text style={styles.errorText}>Invalid Input! Please re-enter your details</Text>
			)}
			<View style={styles.buttonsContainer}>
				<ButtonContainer onPress={cancel}>Cancel</ButtonContainer>
				{isEditing ? (<ButtonContainer onPress={submit}>Update</ButtonContainer>) : 
				(<ButtonContainer onPress={submit}>Add</ButtonContainer>)}
			</View>
		</View>
	)
}

export default ExpenseForm;

const styles = StyleSheet.create({
	rootContainer:{
		flex: 1,
	},
	upperContainer:{
		flexDirection: 'row',
		height: '30%',
	},
	buttonsContainer:{
		flexDirection: 'row',
	},
	errorText:{
		color: '#c53838',
		textAlign: 'center',
		margin: 8
	}
})