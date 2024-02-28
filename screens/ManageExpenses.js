import { useLayoutEffect } from "react";
import { View, StyleSheet} from "react-native";
import IconButton from "../components/IconButton";
import ScreenTemplate from "../components/ScreenTemplate";
import { useContext, useState } from "react";
import { ExpensesContext } from "../context/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import createExpense from "../util/createExpense";
import { storeExpense, updateExpenseBackend, deleteExpenseBackend } from "../util/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorLayout";

function ManageExpenses({route, navigation}){
	const expenseId = route.params?.expenseIds
	const isEditing = !!expenseId;  //a trick to change the value into bool
	const expensesCtx = useContext(ExpensesContext)
	const [isSubmitting, setIsSubmitting] = useState(false) //manage loading submitting state
	const [error, setError] = useState(null) //manage error state

	//Find the expense that corresponds to id
	const selectedExpense = expensesCtx.expenses.find((item)=>{
		return item.id === expenseId
	})
	
	//Display correct title when the layout is generated synchronously
	useLayoutEffect(()=>{
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense'
		})
	},[navigation, isEditing])

	//Delete relevant expenses
	function deleteExpense(){
		try{
			setIsSubmitting(true)
			expensesCtx.deleteExpense(expenseId)
			deleteExpenseBackend(expenseId); 
			setIsSubmitting(true)
		}
		catch(error){
			setError('Could not delete item!')
		}
		navigation.goBack();
	}

	function cancel(){
		navigation.goBack();
	}

	//Adds input expense to the expense list
	function addExpense(expenseData){
		const new_obj = createExpense(expenseData) //tranform object to the appropriate data type
		expensesCtx.addExpense(new_obj)
	}
	
	async function submitHandler(expenseData){
		
		setIsSubmitting(true)
		try{
			if(isEditing){
				await updateExpenseBackend(expenseId, expenseData);
				expensesCtx.updateExpense(expenseId, expenseData)
			}
			else{
				const id = await storeExpense(expenseData) //send data to backend and receive firebase ID
				addExpense({...expenseData, id: id})
			}
		}
		catch(error){
			setError('Could not save Data! Please try again later')
			setIsSubmitting(false)
		}
		navigation.goBack();
	}
	
	if(error && !isSubmitting){
		return(
			<ErrorOverlay message={error}/>
		)
	}

	//Display loading wheel 
	if(isSubmitting){
		return(
			<LoadingOverlay/>
		)
	}

	return(
		<ScreenTemplate>
			<View style={styles(isEditing).headerContainer}>
				<View style={styles().expenseFormContainer}>
					<ExpenseForm defaultValues={selectedExpense} isEditing={isEditing} onSubmit={submitHandler} cancel={cancel}/>
				</View>
			</View>
			{isEditing && (
			<View style={styles().deleteContainer}>
				<IconButton name={'trash'} size={30} color={'red'} onPress={deleteExpense}/>
			</View>
			)}
		</ScreenTemplate>
	)
}

export default ManageExpenses;

const styles = (isEditing) => StyleSheet.create({
	
	headerContainer:{
		height: '35%',
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		width: '90%',
		padding: 5,
		marginLeft: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	deleteContainer:{ 
		flex: 1,
		alignItems: 'center',
		marginTop: 10,
	},
	expenseFormContainer:{
		flex: 1,
		alignSelf: 'stretch'
	},
	
})