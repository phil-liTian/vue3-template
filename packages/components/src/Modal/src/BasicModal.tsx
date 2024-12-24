/*
 * @author: phil.li
 */
import { computed, defineComponent, ref, unref, watchEffect, watch, getCurrentInstance } from "vue";
import { basicProps } from "./props";
import Modal from './components/Modal'
import { ModalHeader } from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import ModalClose from "./components/ModalClose";
import ModalWrapper from "./components/ModalWrapper";
import { useFullScreen } from "./hooks/useModalFullScreen";
import { Nullable, Recordable } from "@phil/types";
import { ModalMethods, ModalProps } from "./interface";
import { omit, deepMerge } from "@phil/utils";
import './style/index.less'


export default defineComponent({
  name: 'PModal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel', 'ok', 'update:open', 'register'],
  setup(props, { slots, attrs, emit }) {
    const modalWrapperRef = ref()
    const openRef = ref(false)
    const propsRef = ref<Partial<Nullable<ModalProps>>>(null)
    const { handleFullScreen, fullScreenRef, getWrapClassName } = useFullScreen({})

    const getMergeProps = computed((): Recordable => {
      return {
        ...props,
        ...(unref(propsRef) as any)
      }
    })

    const getProps = computed((): Recordable => {
      const opt = {
        ...unref(getMergeProps)
      }
      return {
        ...opt,
        wrapClassName: getWrapClassName.value
      }
    })

    const getWrapperHeight = computed(() => {
      if ( unref(fullScreenRef)) return undefined
      return getProps.value.height || 'auto'
    })

    // modal绑定的值
    const getBindValue = computed(() => {
      const attr = {
        ...attrs,
        ...unref(getMergeProps),
        open: unref(openRef)
      } as any

      attr['wrapClassName'] = `${attr?.['wrapClassName'] || ''} ${unref(getWrapClassName)}`
      // if ( unref(fullScreenRef) ) {
      //   return omit(attr, ['title', 'height'])
      // }

      return omit(attr, ['title', 'height'])
    })

    const handleOk = (e) => {
      emit('ok', e)
    }

    const handleCancel = (e) => {
      e?.stopPropagation()

      openRef.value = false
      emit('cancel', e)
    }

    function setModalProps(props: Partial<ModalProps>) {
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
      if ( Reflect.has(props, 'open') ) {
        openRef.value = !!props.open
      }
    }

    const instance = getCurrentInstance()
    const modalMethods: ModalMethods = {
      setModalProps,
      emitOpen: undefined,
      redoModalHeight: () => {

      }
    }

    if ( instance ) {
      emit('register', modalMethods, instance.uid)
    }

    // ============================= header ==============================
    const renderHeader = slots.title || (() =>
      <ModalHeader
        title={getProps.value.title}
        helpMessage={getProps.value.helpMessage} />)


    // ============================= footer ==============================
    const renderFooter = slots.footer || (() =>
      <ModalFooter
        onOk={handleOk}
        onCancel={handleCancel}
        v-slots={slots} />)


    // ============================= wrapper ==============================
    const renderWrapper = () =>
      <ModalWrapper
        ref={modalWrapperRef}
        open={openRef.value}
        height={getWrapperHeight.value}
        fullScreen={fullScreenRef.value}
        {...omit(getProps.value, ['open'])}>
        {slots.default?.()}
      </ModalWrapper>


    // ============================= close ==============================
    const renderClose = slots.close || (() =>
      <ModalClose
        fullScreen={fullScreenRef.value}
        onFullscreen={handleFullScreen}
        onCancel={handleCancel} />)

    watchEffect(() => {
      openRef.value = !!props.open
    })

    watch(() => unref(openRef), (v) => {
      emit('update:open', v)
    })

    return () => {
      return <Modal
        {...getBindValue.value}
        v-slots={{
          title: renderHeader,
          footer: renderFooter,
          closeIcon: renderClose,
          default: renderWrapper
        }} />
    }
  }
})
