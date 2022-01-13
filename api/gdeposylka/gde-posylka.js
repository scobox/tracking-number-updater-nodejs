import fetch from "node-fetch";
import { GPkey, GP_URL } from "../../private_keys/gde-posylka_keys.js";

const getProgressByTracking = (trackingNumber) => {
	console.log("sending request to gdeposylka on ", trackingNumber);
	return new Promise((resolve, reject) => {
		fetch(GP_URL + trackingNumber, {
			method: 'GET',
			headers: {
				'X-Authorization-Token': GPkey,
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				console.log("received response from gdeposylka on", trackingNumber);
				return response.json();
			})
			.then(res => {
				resolve(res);
			})
			.catch(err => console.log("error", err))
	})
}

export { getProgressByTracking }