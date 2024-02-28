import { Pressable, StyleSheet, Text } from "react-native";

function FlatButton({children, onPress}){
	return(
		<Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	)
}

export default FlatButton;

const styles = StyleSheet.create({
	button:{
		paddingVertical: 6,
		paddingHorizontal: 12,
	},
	text:{
		textAlign: 'center',
		color: 'white',
	},
	pressed:{
		opacity: 0.7
	}
})