class Expense{
	constructor(id,title,date,amount){
		this.id = id;
		this.title = title;
		this.date = new Date(date);
		this.amount = amount;
	}
}

export default Expense;