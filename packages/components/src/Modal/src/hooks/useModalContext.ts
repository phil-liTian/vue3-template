import { inject, InjectionKey, provide } from 'vue'

export interface ModalContextProps {
	redoModalHeight: () => void
}

const key: InjectionKey<ModalContextProps> = Symbol('modalContextProps')

export function createModalContext(context: ModalContextProps) {
	return provide(key, context)
}

export function useModalContext() {
	return inject(key)
}
