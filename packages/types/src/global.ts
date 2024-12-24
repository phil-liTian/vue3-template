export type Nullable<T> = T | null

export type Recordable<T = any> = Record<string, T>

export type AnyFunction<T> = (...args: any[]) => T

export type RefElement = Nullable<HTMLElement>

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export type Merge<O extends object, T extends object> = {
	[K in keyof O | keyof T]: K extends keyof T
		? T[K]
		: K extends keyof O
		? O[K]
		: never
}

export type MergeAll<T extends object[], R extends object = {}> = T extends [
	infer F extends object,
	...infer Rest extends object[]
]
	? MergeAll<Rest, Merge<R, F>>
	: R
