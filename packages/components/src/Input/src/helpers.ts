import { IInputValueType } from "./Input"

export interface IInputOptions {
	max?: number
	min?: number
}
export const valueFormatter = (
	value,
	type: IInputValueType,
	options: IInputOptions
) => {
	const { max, min } = options
	switch (type) {
    // 价格或者百分比
		case 'price':
    case 'ratio':
			const priceReg = /[^\d\.]/g
			if (value.startsWith('.')) {
				return ''
			}
			value = value.replace(priceReg, '')
			// 只能有一个小数点和两位小数
			value = value
				.replace(/\.{2,}/g, '.')
				.replace('.', '$#$')
				.replace(/\./g, '')
				.replace('$#$', '.')
				.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
			if (max && value > max) {
				return max
			}

			if (min && value < min) {
				return min
			}
			return value

    // 纯数字
    case 'number': {
      value = value.replace(/[^\d]/g, '')
      return value
    }

    // 字母 + 数字 + 下划线
    case 'code': {
      value = value.replace(/[^\w]/g, '')
      return value
    }

    // 字母 + 数字
    case 'charOrNum': {
      value = value.replace(/[^a-zA-Z0-9]/g, '')
      return value
    }

		default:
			return value
	}
}
