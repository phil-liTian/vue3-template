import { isString, isArray, isObject } from './is'

/**
 * 将args拼接成class字符串, 元素可以是数组、对象、字符串
 * @param args
 * @returns
 */
function classNames(...args: any[]) {
	let classes: string[] = []

	for (let i = 0; i < args.length; i++) {
		const value = args[i]
		if (!value) continue
		if (isString(value)) {
			classes.push(value)
		} else if (isArray(value)) {
			classNames(...value)
		} else if (isObject(value)) {
			for (const key in value) {
				if (value[key]) {
					classes.push(key)
				}
			}
		}
	}

	return classes.join(' ')
}

export { classNames }
