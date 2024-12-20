 export function omit<T extends object, K extends keyof T>(obj: T, fields: K[]) {
	const shallowCopy = Object.assign({}, obj)
	for (let i = 0; i < fields.length; i++) {
		const field = fields[i]
		delete shallowCopy[field]
	}

	return shallowCopy
}

