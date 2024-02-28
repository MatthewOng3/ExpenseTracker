import { View, StyleSheet, FlatList, Text } from "react-native";
import ScreenTemplate from "../components/ScreenTemplate";
import ExpenseItem from "../components/ExpenseItem";
import SummaryPeriod from "../components/SummaryPeriod";
import { getFormatDate } from '../util/FormatDate';


function ExpensesOutputTemplate({expensePeriod, expenses, defaultText}){
	let content = <Text style={styles.infoText}>{defaultText}</Text> //default text to fallback on if no data
	
	if (expenses.length > 0){
		content = <FlatList data={expenses} renderItem={(itemData) => {
			return(
				<ExpenseItem title={itemData.item.title} date={getFormatDate(itemData.item.date)} price={parseInt(itemData.item.amount)} id={itemData.item.id}/>
			);
		}} keyExtractor={(item)=>item.id}/>
	}

	return( 
		<ScreenTemplate>
			<View style={styles.rootContainer}>
				<SummaryPeriod period={expensePeriod} expenses={expenses}/>
				<View style={styles.listContainer}>
					{content}
				</View>
			</View>
		</ScreenTemplate>
	)
}

export default ExpensesOutputTemplate;

const styles = StyleSheet.create({
	rootContainer:{
		flex: 1
	},
	listContainer:{
		flex: 0.9,
	},
	headerContainer:{
		flex: 0.1
	},
	infoText:{
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 32
	}
})