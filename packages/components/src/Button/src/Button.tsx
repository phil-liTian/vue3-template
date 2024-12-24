import { computed, defineComponent, h } from 'vue'
import { Button } from 'ant-design-vue'
import { useDesign } from '../../hooks/useDesign'
import { buttonProps } from './props'
import './style/index.less'

export default defineComponent({
  name: 'PButton',
  props: buttonProps,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const { preIcon, postIcon, iconSize } = props
    const { prefixCls } = useDesign('button')

    const getButtonClass = computed(() => {
      return [prefixCls]
    })

    const handleClick = () => {
      emit('click')
    }

    return () => <Button onClick={handleClick} v-slots={{
      ...slots,
      default: () => {
        return <div class={getButtonClass.value}>
          {preIcon && <p-icon icon={preIcon} size={iconSize} />}
          {slots.default?.()}
          {postIcon && <p-icon icon={postIcon} size={iconSize} />}
        </div>
      }
    }} />
  }
})