import ExpensesOutputTemplate from "../components/ExpenseOutputTemplate";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from '../context/expenses-context';
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/LoadingOverlay";

function AllExpenses(){
	const [isFetching, setIsFetching] = useState(true) //loading state
	const expensesCtx = useContext(ExpensesContext)	
	
	useEffect(()=>{
		async function getExpenses() {
			//since fetchExpenses is async, it will also yield a promise, so use await to wait for the promise to be resolved, waiting for data to return
			const expenses = await fetchExpenses(); 
			setIsFetching(false)
			expensesCtx.setExpenses(expenses); //forward fetched data from firebase to the context 
			
		}
		getExpenses()
	},[expensesCtx.expenses])
 
	//Show loading overlay if data is still being fetched
	if(isFetching){
		return(
			<LoadingOverlay/>
		)
	}

	return(
		<ExpensesOutputTemplate expenses={expensesCtx.expenses} expensePeriod={'Total'} defaultText={'No expenses'}/>
	)
}

export default AllExpenses;

