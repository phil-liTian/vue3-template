/*
 * @author: phil.li
 */
import { computed, defineComponent, PropType } from "vue";
import BasicHelp from "./BasicHelp";
import './style/BasicTitle.less'
import { useDesign } from "../../hooks/useDesign";

export default defineComponent({
  name: 'PBasicTitle',
  props: {
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-title')
    const getClass = computed(() => [
      prefixCls,
    ])
    return () => {
      return <span class={getClass.value}>
        {slots.default?.()}
        {props.helpMessage &&
          <BasicHelp
            class={`${prefixCls}-help`}
            text={props.helpMessage} />}
      </span>
    }
  }
})
