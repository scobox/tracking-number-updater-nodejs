import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from "firebase/database";
import { firebaseConfig } from "../../private_keys/firebase_keys.js";


initializeApp(firebaseConfig);
const database = getDatabase();
const dbRef = ref(getDatabase());

const getList = () => {
	return new Promise((resolve, reject) => {
		get(child(dbRef, `trackingNumbers/`)).then((snapshot) => {
			if (snapshot.exists()) {
				resolve(snapshot.val());
			} else {
				resolve({ status: "No data available" });
			}
		}).catch((error) => {
			resolve({ error });
		});
	})

}

const addUpdateToTracking = (trackingNumber, payload = {}) => {
	return new Promise((resolve, reject) => {
		const date = (new Date()).toISOString().slice(0, 10);
		const is_delivered = payload?.data?.is_delivered ?? false;
		set(ref(database, 'trackingNumbers/' + trackingNumber),
			{ ...payload, date, isDelivered: is_delivered }
		)
			.then(() => {
				console.log(`Update on ${trackingNumber} is succsessful on Firebase`);
				// Data saved successfully!
				resolve(true);
			})
			.catch((error) => {
				console.log(`Error on saving ${trackingNumber} update to firebase`);
				// The write failed...
				reject(false);
			})
	})

}


export { addUpdateToTracking, getList }