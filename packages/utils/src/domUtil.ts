
import { upperFirst } from 'lodash-es'
interface Fn<T = any, R = T> {
	(...arg: T[]): R
}

export function on(
	element: Element | HTMLElement | Document | Window,
	event: string,
	handler: EventListenerOrEventListenerObject
): void {
	if (element && event && handler) {
		element.addEventListener(event, handler, false)
	}
}


export function off(
	element: Element | HTMLElement | Document | Window,
	event: string,
	handler: Fn
): void {
	if (element && event && handler) {
		element.removeEventListener(event, handler, false)
	}
}


export function hackCss(attr: string, value: string) {
	const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT']

	const styleObj: any = {}
	prefix.forEach((item) => {
		styleObj[`${item}${upperFirst(attr)}`] = value
	})
	return {
		...styleObj,
		[attr]: value,
	}
}

export function getBoundingClientRect(element: Element): DOMRect | number {
	if (!element || !element.getBoundingClientRect) {
		return 0
	}
	return element.getBoundingClientRect()
}


export function trim(string: string) {
	return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function hasClass(el: Element, cls: string) {
	if (!el || !cls) return false
	if (cls.indexOf(' ') !== -1)
		throw new Error('className should not contain space.')
	if (el.classList) {
		return el.classList.contains(cls)
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
	}
}

export function addClass(el: Element, cls: string) {
	if (!el) return
	let curClass = el.className
	const classes = (cls || '').split(' ')

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i]
		if (!clsName) continue

		if (el.classList) {
			el.classList.add(clsName)
		} else if (!hasClass(el, clsName)) {
			curClass += ' ' + clsName
		}
	}
	if (!el.classList) {
		el.className = curClass
	}
}

export function removeClass(el: Element, cls: string) {
	if (!el || !cls) return
	const classes = cls.split(' ')
	let curClass = ' ' + el.className + ' '

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i]
		if (!clsName) continue

		if (el.classList) {
			el.classList.remove(clsName)
		} else if (hasClass(el, clsName)) {
			curClass = curClass.replace(' ' + clsName + ' ', ' ')
		}
	}
	if (!el.classList) {
		el.className = trim(curClass)
	}
}
