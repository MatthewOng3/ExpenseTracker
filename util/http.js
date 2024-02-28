import axios from 'axios'

const URL = 'https://expense-tracker-8b282-default-rtdb.asia-southeast1.firebasedatabase.app/'

/*Helper function for sending HTTP requests*/
export async function storeExpense(expenseData){
	//sends a post request, and add an expenses folder in the backend, expenses is the node/folder created in backend
	//Stores data in chronological order
	const response = await axios.post(URL + 'expenses.json', expenseData); 

	//Get the firebase generated ID
	const id = response.data.name; 
	
	return id
}

/*Helper function for fetching backend data*/
export async function fetchExpenses(){
	const response = await axios.get(URL + 'expenses.json')

	const expenses = [];//only execute once reponse is there, array of objects

	//data is an axios property to refer to the data received
	for (const key in response.data){ //key variable with be the unique id created by firebase
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),  //need to convert back into date object because firebase stores all data as strings
			title: response.data[key].title
		}

		expenses.push(expenseObj);
	}
	
	return expenses;
}

export function updateExpenseBackend(id, expenseData){
	return axios.put(URL + `/expenses/${id}.json`, expenseData)
}

//Dont need async keyword because only returning the result of calling the axios method
export function deleteExpenseBackend(id){
	return axios.delete(URL + `/expenses/${id}.json`)
}
