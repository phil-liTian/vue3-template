import { computed, defineComponent, PropType, ref } from "vue";
import { Input } from 'ant-design-vue'
import { propTypes } from "@phil/types";
import { valueFormatter } from "./helpers";

export type IInputValueType = 'price' | 'default' | 'number' | 'code' | 'ratio' | 'charOrNum'

export default defineComponent({
  name: 'PInput',
  inheritAttrs: false,
  props: {
    value: propTypes.any,
    valueType: {
      type: String as PropType<IInputValueType>,
      default: 'default'
    }
  },
  emits: ['update:value'],
  setup(props, { slots, emit, attrs }) {
    const showValue = ref()

    const handleInput = (e) => {
      e.target.value = valueFormatter(e.target.value, props.valueType, {})
      showValue.value = e.target.value
      emit('update:value', e.target.value)
    }

    const getBindProps = computed(() => {
      return {
        value: showValue.value,
        ...attrs
      }
    })

    return () => {
      return <Input {...getBindProps.value} onInput={handleInput} />
    }
  }
})