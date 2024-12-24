import { getCurrentInstance, ref } from "vue"
import { ModalMethods, ModalProps, ReturnMethods, UseModalReturnType } from "../interface"
import { Nullable } from "@phil/types"

export function useModal(): UseModalReturnType {
	const modal = ref<Nullable<ModalMethods>>(null)
	const uid = ref<number>(0)
	function register(modalMethods: ModalMethods, uuid: number) {
		if ( !getCurrentInstance() ) {
			throw new Error('useModal() can only be used inside setup() or functional components.')
		}

		uid.value = uuid
		modal.value = modalMethods
	}

	const getInstance = () => {
		const instance = modal.value
		if ( !instance ) {
			throw new Error('useModal instance is undefined!')
		}
		return instance
	}

	const methods: ReturnMethods = {
		setModalProps(props: Partial<ModalProps>) {
			getInstance()?.setModalProps(props)
		},

		openModal<T = any>(open = true, data?: T, openOnSet = true) {
			getInstance()?.setModalProps({ open })
			if ( !data ) return
		},

		closeModal() {
			getInstance()?.setModalProps({ open: false })
		},
	}

	return [register, methods]
}
