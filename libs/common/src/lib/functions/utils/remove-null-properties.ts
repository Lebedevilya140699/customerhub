export function removeNullProperties(obj: any) {
	Object.keys(obj).forEach((key: string) => {
		let value = obj[key];
		let hasProperties = value && Object.keys(value).length > 0;
		if (value === null) {
			delete obj[key];
		} else if (typeof value !== 'string' && hasProperties) {
			removeNullProperties(value);
		}
	});

	return obj;
}
