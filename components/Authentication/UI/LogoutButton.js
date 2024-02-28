import { Pressable, StyleSheet, Text, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';

function LogoutButton({onPress}){
	return(
		<Pressable onPress={onPress} style={({pressed}) => [styles.container, pressed && styles.pressed]}>
			<Ionicons name={'log-out'} size={27} color={'white'}/>
			<Text style={styles.text}>Logout</Text>
		</Pressable>
	)
}

export default LogoutButton;

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		marginLeft: 20
	},
	text:{
		fontSize: 15,
		color: 'white',
		paddingTop: 5,
		paddingLeft: 2,
		fontStyle:  "italic"
	},
	pressed:{
		opacity: 0.7
	}
})