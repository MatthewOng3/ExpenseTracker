import {View, StyleSheet, Text, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native';

function ExpenseItem({id,title,date,price}){
	const navigation = useNavigation();
	
	function toManageExpenses(){
		navigation.navigate('Manage Expenses',{
			expenseIds: id 
		})
	}
	
	return(
		<Pressable style={({pressed}) => pressed ? [styles.container, styles.pressed] : styles.container} onPress={toManageExpenses}>
			<View>
				<Text style={styles.titleText}>{title}</Text>
				<Text style={styles.dateText}>{date}</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.priceText}>${price.toFixed(2)}</Text>
			</View>
		</Pressable>
	)
}

export default ExpenseItem;

const styles = StyleSheet.create({
	container:{
		backgroundColor: '#3e3c3c',
		borderRadius: 8,
		borderWidth:2,
		padding: 15,
		height: 70,
		marginVertical: 8,
		marginHorizontal: 8,
		width: '95%',
		flexDirection: 'row',
	},
	titleText:{
		fontSize: 18,
		color: 'white'
	},
	dateText:{
		fontStyle: 'italic',
		color: 'white'
	},
	priceText:{
		color: 'white',
		fontSize: 18,
	},
	textContainer:{
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	pressed:{
		opacity: 0.6
	}
})