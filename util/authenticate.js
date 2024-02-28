import axios from "axios";

const API_KEY = 'AIzaSyCRL2437De8aUjPMEwJ5NwRWKEC015LaQk'

/*Send a post request to back end with a object with the necessary details, the objects names are set */
async function authenticateUser(mode, email, password) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
	

	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true,
	});

	//Retrieve token sent by firebase
	const token = response.data.idToken;
	return token
}
  
/*Create user in the backend*/
export async function createUser(email, password) {
	return authenticateUser('signUp', email, password);
}

/*Login user in the backend*/
export async function login(email, password) {
	return await authenticateUser('signInWithPassword', email, password);
}

