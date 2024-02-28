import { Text, StyleSheet, Pressable } from "react-native";


function SignInButton({onPress,children}){
	return(
		<Pressable onPress={onPress}style={({pressed}) => pressed ? [styles.rootContainer,styles.pressed] : styles.rootContainer} >
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	) 
}

export default SignInButton;

const styles = StyleSheet.create({
	rootContainer:{
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: '#2f2d2d',
		padding: 5,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		marginBottom: 10,
		height: 40
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