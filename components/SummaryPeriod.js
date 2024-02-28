import { View, Text, StyleSheet} from 'react-native';

function SummaryPeriod({period, expenses}){
	
	//Calculate sum of all expenses
	const total_result = expenses.reduce((sum, expense)=> {
		return sum + parseInt(expense.amount)
	}, 0)

	return(
		<View style={styles.rootContainer}>
			<Text style={styles.textContainer}>{period}</Text>
			<Text style={styles.priceText}>${total_result}</Text>
		</View>
	)
}

export default SummaryPeriod;

const styles = StyleSheet.create({
	rootContainer:{
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: 'white',
		margin: 20,
		justifyContent: 'center',
		height: 35,
		borderColor: 'white',
		flexDirection: 'row',
	},
	textContainer:{
		padding: 10,
		fontSize: 15,
		fontStyle: 'italic',
		color: '#a7a4a4',
		flex: 0.8,
		paddingBottom: 5
	},
	priceText:{
		color: 'black',
		fontSize: 18,
		flex: 0.2,
		padding: 7,
		paddingLeft: 50
	},
})