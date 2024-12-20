import { App, Component } from 'vue'
import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es'
import { isArray, isObject } from './is'
export * from './is'
export * from './log'
export * from './uuid'
export * from './omit'

type EventShim = {
	new (...args: any[]): {
		$props: {
			onClick?: (...args: any[]) => void
		}
	}
}

export type WithInstall<T> = T & {
	install(app: App): void
} & EventShim

export type CustomComponent = Component & { displayName?: string }

export const withInstall = <T extends CustomComponent>(
	component: T,
	alias?: string
) => {
	;(component as Record<string, unknown>).install = (app: App) => {
		const compName = component.name || component.displayName
		if (!compName) return
		app.component(compName, component)
		if (alias) {
			app.config.globalProperties[alias] = component
		}
	}
	return component as WithInstall<T>
}

export function deepMerge<
	T extends object | null | undefined,
	U extends object | null | undefined
>(
	source: T,
	target: U,
	mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace'
): T & U {
	if (!target) {
		return source as T & U
	}
	if (!source) {
		return target as T & U
	}
	return mergeWith({}, source, target, (sourceValue, targetValue) => {
		if (isArray(targetValue) && isArray(sourceValue)) {
			switch (mergeArrays) {
				case 'union':
					return unionWith(sourceValue, targetValue, isEqual)
				case 'intersection':
					return intersectionWith(sourceValue, targetValue, isEqual)
				case 'concat':
					return sourceValue.concat(targetValue)
				case 'replace':
					return targetValue
				default:
					throw new Error(
						`Unknown merge array strategy: ${mergeArrays as string}`
					)
			}
		}
		if (isObject(targetValue) && isObject(sourceValue)) {
			return deepMerge(sourceValue, targetValue, mergeArrays)
		}
		return undefined
	})
}
