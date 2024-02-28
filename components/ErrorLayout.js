import { View, Text, StyleSheet } from "react-native";

function ErrorOverlay({message}){
	return(
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An Error Occured!</Text>
			<Text style={styles.text}>{message}</Text>
		</View>
	)
}

export default ErrorOverlay;

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		flex: 1,
		backgroundColor: '#111212'
	},
	text:{
		color: 'white',
		textAlign: 'center',
		marginBottom: 8
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold'
	},
})