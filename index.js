import { addUpdateToTracking, getList } from "./api/firebase-config/firebase.js";
import { getProgressByTracking } from "./api/gdeposylka/gde-posylka.js";
import { dataProcessing } from "./data-processing/data-processing.js";

getList()
	.then(res => {
		console.log("Obtaing list of tracking numbers from Firebase");
		const trackingNumbers = Object.keys(res);
		const updateStatus = {};

		console.log("tracking numbers:", trackingNumbers);
		trackingNumbers.forEach(trNum => {
			getProgressByTracking(trNum)
				.then(res => {
					console.log(`Received update on thacking number ${trNum}, saving it to Firebase`);
					addUpdateToTracking(trNum, dataProcessing.rename(res))
						.then(res => updateStatus[trNum] = res);
				});
		});

		setInterval(() => {
			if (trackingNumbers.length == Object.keys(updateStatus).length) {
				console.log("all done, result: ", trackingNumbers, updateStatus);
				process.exit(0);
			}
		}, 500);

	});




