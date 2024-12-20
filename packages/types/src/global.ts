export type Nullable<T> = T | null

export type Recordable<T = any> = Record<string, T>

export type AnyFunction<T> = (...args: any[]) => T

export type RefElement = Nullable<HTMLElement>
