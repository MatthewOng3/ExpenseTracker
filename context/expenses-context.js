import { createContext, useReducer } from "react";

//Context object to be defined in the provider function wrapper
//variables and functions to call in other files when using this context state
export const ExpensesContext = createContext({
	expenses: [], 
	addExpense: ({title, amount, date}) => {}, 
	setExpenses: (expenses) =>{},
	deleteExpense: (id) => {},
	updateExpense: (id,{ title, amount, date }) => {}
});

//Check action type dispatched from the provider function and perform certain sections and return updated state
//state and action is automatically given as input by react
function expensesReducer(state, action){
	switch(action.type){
		case 'ADD':
			//add all the info in the new object received in the action payload, along with the old state
			return [action.payload,...state];
		case 'SET':
			//set the expenses array as the fetched data from firebase
			const inverted = action.payload.reverse(); //keep the date order

			return inverted;
		case 'DELETE':
			//Get the id of the item that needs to be deleted
			const deleting_id = action.payload
			
			//Filter out the id that needs to be deleted
			state.filter((item)=>{
				return item.id !== deleting_id
			})
			
			return state;
		case 'UPDATE':
			//find index in the array state that has the corresponding id
			const updatingIndex = state.findIndex((expense)=> expense.id === action.payload.id) 
			console.log('IN CONTEXT',typeof(action.payload.data.date), action.payload.data.date)
			//Get the expense object that needs updating
			let updatingExpense = state[updatingIndex];
			updatingExpense = {...updatingExpense, ...action.payload.data} //update the data object using spread operator
			//Need to copy into a new array because state does not change if it just updates a single value, so component wont re render
			const updatedExpenses = [...state]; //construct a new array to keep everything immutable
			updatedExpenses[updatingIndex] = updatingExpense;

			return updatedExpenses;
		default:
			return state
	}
}

function ExpensesContextProvider({children}){

	const [expensesState, dispatch] = useReducer(expensesReducer, []); //dispatch an action to the reducer, expensesState is the expenses array state
	 
	//expenseData is object with title amount and date
	function addExpense(expenseData){
		dispatch({type: 'ADD', payload: expenseData}) //payload is convention for naming the object/data you're sending to the reducer
	}

	//Dispatch the set action
	function setExpenses(expenses){
		dispatch({type: 'SET', payload: expenses})
	}

	//update expense
	function updateExpense(id, expenseData){
		dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
	}

	//delete expense
	function deleteExpense(id){
		dispatch({type: 'DELETE', payload: id})
	}
	
	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		setExpenses: setExpenses,
		updateExpense: updateExpense,
		deleteExpense: deleteExpense
	}
	
	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	)
}

export default ExpensesContextProvider;