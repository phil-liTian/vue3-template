/*
 * @author: phil.li
 */
import { defineComponent } from "vue";
import { basicProps } from "./props";
import Modal from './components/Modal'
import { ModalHeader } from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import ModalClose from "./components/ModalClose";
import ModalWrapper from "./components/ModalWrapper";

export default defineComponent({
  name: 'PModal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel', 'ok'],
  setup(props, { slots }) {
    console.log('props', props);

    const handleOk = (e) => {
      console.log('e', e);
    }

    const handleCancel = (e) => {
      console.log('cancel', e);
    }

    const renderHeader = slots.title || (() => <ModalHeader title='1231' />)
    const renderFooter = slots.footer || (() => <ModalFooter onOk={handleOk} onCancel={handleCancel} v-slots={slots} />)
    const renderWrapper = slots.default?.() || (() => <ModalWrapper />)

    const renderClose = slots.close || (() => <ModalClose />)

    return () => {
      return <Modal v-slots={{
        title: renderHeader,
        footer: renderFooter,
        closeIcon: renderClose,
        default: renderWrapper
      }} />
    }
  }
})
