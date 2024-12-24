

import { computed, defineComponent, ref } from 'vue'
import { BAR_MAP, renderThumbStyle } from './utils'
import { Recordable } from '@phil/types'

export default defineComponent({
  name: 'Bar',
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  setup(props) {
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })
    const barStore = ref<Recordable>({})

    const clickTrackHandler = (e) => {
      console.log('e', e.target.getBoundingClientRect());
    }

    const clickThumbHandler = e => {
      if ( e.ctrlKey || e.button === 2 ) {
        return
      }
    }

    const getClass = computed(() => {
      return [
        'scrollbar__bar',
        `is-${bar.value.key}`
      ]
    })
    return () => <div class={getClass.value} onMousedown={clickTrackHandler}>
      <div 
        class='scrollbar__thumb' 
        onMousedown={clickThumbHandler}
        style={renderThumbStyle({ size: props.size, move: props.move, bar: bar.value })}></div>
    </div>
  }
})