/*
 * @author: phil.li
 */
import { Modal } from 'ant-design-vue'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => <Modal v-slots={slots} open={true}>123</Modal>
  }
})
