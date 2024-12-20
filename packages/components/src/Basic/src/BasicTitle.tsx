/*
 * @author: phil.li
 */
import { computed, defineComponent } from "vue";
import BasicHelp from "./BasicHelp";
import './style/BasicTitle.less'
import { useDesign } from "../../hooks/useDesign";

export default defineComponent({
  name: 'PBasicTitle',
  setup() {
    const { prefixCls } = useDesign('basic-title')
    const getClass = computed(() => [
      prefixCls,
    ])
    return () => {
      return <span class={getClass.value}>
        <slot></slot>
        <BasicHelp />
      </span>
    }
  }
})
