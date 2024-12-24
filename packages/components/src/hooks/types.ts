import { PropType } from 'vue'

// 定义给一个对象类型的props, 参数作为默认值
export function ObjectType<T = {}>(defaultValue?: T) {
	return { type: Object as PropType<T>, default: defaultValue as T }
}

// 定义一个boolean类型的props
export function BooleanType(defaultValue?: boolean) {
	return { type: Boolean, default: defaultValue as boolean }
}

// 定义函数类型的props
export function FunctionType<T = () => {}>(defaultValue?: T) {
	return { type: Function as PropType<T>, default: defaultValue as T }
}

// 定义string类型的props
export function StringType<T extends string = string>(defaultValue?: T) {
	return { type: String as unknown as PropType<T>, default: defaultValue as T }
}

// 定义array类型的props
export function ArrayType<T = any>(defaultValue?: T) {
	return { type: Array as unknown as PropType<T>, default: defaultValue as T }
}

export function NumberType<T extends number = number>(defaultValue?: T) {
	return { type: Number as unknown as PropType<T>, default: defaultValue as T }
}
