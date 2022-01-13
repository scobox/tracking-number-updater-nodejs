const invalidCharsRegExp = /\.|\#|\$|\/|\[|\]/g;

const rename = (object) => {
	if (Array.isArray(object)) {
		object.forEach((el, index) => {
			object[index] = rename(el);
		});
	} else if (typeof object == 'object' && object !== null) {
		const keys = Object.keys(object);
		keys.map(key => {
			if (typeof object[key] == 'object' && !null) object[key] = rename(object[key]);
			const newKey = key.replace(invalidCharsRegExp, "_");
			if (newKey !== key) {
				object[newKey] = object[key];
				delete object[key];
			}
		})
	}
	return object;
}

export const dataProcessing = { rename }
