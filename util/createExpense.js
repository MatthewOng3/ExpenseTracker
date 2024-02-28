import Expense from "../models/Expense"

/*Function to transform input into an expense object*/
export default function createExpense(expense_obj){
	return new Expense(expense_obj.id, expense_obj.title, expense_obj.date, parseInt(expense_obj.amount))
}

