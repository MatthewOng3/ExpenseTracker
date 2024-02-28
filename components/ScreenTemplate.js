import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; 

function ScreenTemplate({children}){
	return(
		<LinearGradient colors={['#111212', '#1f1f1f']} style={styles.rootContainer}>
			{children}
		</LinearGradient>
	)
}

export default ScreenTemplate;

const styles = StyleSheet.create({
	rootContainer:{
		flex: 1
	}
})