import { View, Text, StyleSheet, Pressable } from "react-native";


function ButtonContainer({onPress,children}){
	return(
		<Pressable onPress={onPress}style={({pressed}) => pressed ? [styles.rootContainer,styles.pressed] : styles.rootContainer} >
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	)
}

export default ButtonContainer;

const styles = StyleSheet.create({
	rootContainer:{
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: '#2f2d2d',
		padding: 5,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		flex: 1,
	},
	text:{
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
	},
	pressed:{
		opacity: 0.6
	}
})