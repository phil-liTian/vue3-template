/*
 * @author: phil.li
 */
import { defineComponent } from "vue";
import Modal from './components/Modal'
import { ModalHeader } from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import { basicProps } from "./props";

export default defineComponent({
  name: 'PModal',
  inheritAttrs: false,
  props: basicProps,
  setup(props, { slots }) {
    const renderHeader = slots.title || ModalHeader
    const renderFooter = slots.footer || (() => <ModalFooter />)

    return () => {
      return <Modal v-slots={{ title: renderHeader, footer: renderFooter }} />
    }
  }
})
