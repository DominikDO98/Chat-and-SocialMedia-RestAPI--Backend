export function shallowEqual(object1: any, object2: any) {
	let result = true;
	const keys1 = Object.keys(object1);
	for (const key of keys1) {
		if (object1[key] !== object2[key]) {
			result = false;
		}
	}
	return result;
}
