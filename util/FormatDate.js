
export function getFormatDate(date){

	date = new Date(date) //Transform the date input into a date object again 

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function getExistingDate(date){
	return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`
}

export function getRecentDays(date, days){
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}