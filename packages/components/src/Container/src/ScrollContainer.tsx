import { defineComponent, ref } from 'vue'
import { Scrollbar } from '../../Scrollbar/index'

export default defineComponent({
  name: 'ScrollContainer',
  props: {
    scrollHeight: Number
  },

  setup(props, { slots }) {
    const scrollbarRef = ref(null)
    const { scrollHeight } = props
    
    return () => {
      return <Scrollbar ref={scrollbarRef} scrollHeight={scrollHeight}>
        {slots.default?.()}
      </Scrollbar>
    }
  }
})