/*
 * @author: phil.li
 */
import { computed, defineComponent } from "vue";
import { basicProps } from "../props";

export default defineComponent({
  name: 'ModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  setup(props, { slots, emit }) {
    const { okText, okButtonProps, okType, cancelText, cancelButtonProps, showCancelBtn, showOkBtn } = props
    const showOkButtonProps = computed(() => {
      return { ...okButtonProps, type: okType, onClick: (e) => emit('ok', e) }
    })

    const handleCancel = e => {
      emit('cancel', e)
    }

    return () => <div>
      {slots.insertFooter && slots.insertFooter()}
      {showCancelBtn && <p-button onClick={handleCancel} {...cancelButtonProps}>{cancelText}</p-button>}
      {slots.centerFooter && slots.centerFooter()}
      {showOkBtn && <p-button {...showOkButtonProps.value}>{okText}</p-button>}
      {slots.appendFooter && slots.appendFooter()}
    </div>
  }
})