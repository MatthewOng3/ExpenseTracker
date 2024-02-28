import ExpensesOutputTemplate from "../components/ExpenseOutputTemplate";
import {ExpensesContext}  from "../context/expenses-context";
import { useContext, useEffect, useState } from "react";
import { getRecentDays } from "../util/FormatDate";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorLayout";

function RecentExpenses(){
	const [isFetching, setIsFetching] = useState(true) //loading state
	const [error, setError] = useState(null)

	const expensesCtx = useContext(ExpensesContext);

	useEffect(()=>{
		async function getExpenses() {
			try{
				//since fetchExpenses is async, it will also yield a promise, so use await to wait for the promise to be resolved, waiting for data to return
				const expenses = await fetchExpenses(); 
				expensesCtx.setExpenses(expenses); //forward fetched data from firebase to the context
			}
			catch(error){
				setError('Could not fetch Expenses')
			}
			setIsFetching(false)
		}
		getExpenses()
	},[])
	
	function errorHandler(){
		setError(null)
	}

	//If error is not null and the app isnt fetching data, display error
	if(error && !isFetching){
		<ErrorOverlay message={error}/>
	}

	//Show loading overlay if data is still being fetched
	if(isFetching){
		return(
			<LoadingOverlay/>
		)
	}

	//Filter out the recent expenses that are added in the last 7 days
	const recentExpenses = expensesCtx.expenses.filter((expense)=>{
		const today = new Date(); 
		const date7daysAgo = getRecentDays(today,7)

		return (expense.date >= date7daysAgo) && (expense.date <= today);
	})

	return(
		<ExpensesOutputTemplate expenses={recentExpenses} expensePeriod={'Last 7 days'} defaultText={'No recent expenses'}/>
	)
}

export default RecentExpenses;

