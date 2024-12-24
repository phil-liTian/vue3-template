/*
 * @author: phil.li
 */
import { Modal } from 'ant-design-vue'
import { defineComponent, toRefs, unref } from 'vue'
import { basicProps } from '../props'
import { Recordable } from '@phil/types'
import { useModalDragMove } from '../hooks/useModalDrag'

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, attrs }) {
    const { open, draggable, destroyOnClose } = toRefs(props)
    useModalDragMove({ open, draggable, destroyOnClose })

    return () => {
      const propsData = { ...props, ...unref(attrs) } as Recordable

      return <Modal {...propsData} v-slots={slots}></Modal>
    }
  }
})
