export {
	isArguments,
	isArrayBuffer,
	isArrayLike,
	isArrayLikeObject,
	isBuffer,
	isBoolean,
	isDate,
	isElement,
	isEmpty,
	isEqual,
	isEqualWith,
	isError,
	isFunction,
	isFinite,
	isLength,
	isMap,
	isMatch,
	isMatchWith,
	isNative,
	isNil,
	isNumber,
	isNull,
	isObjectLike,
	isPlainObject,
	isRegExp,
	isSafeInteger,
	isSet,
	isString,
	isSymbol,
	isTypedArray,
	isUndefined,
	isWeakMap,
	isWeakSet,
} from 'lodash-es'

export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`
}

export function isObject(val: any): val is Record<any, any> {
	return val !== null && is(val, 'Object')
}
