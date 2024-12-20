/*
 * @author: phil.li
 */
import { defineComponent } from "vue";
import { Tooltip } from 'ant-design-vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { useDesign } from "../../hooks/useDesign";
import { getSlot } from "../../helpers/tsxHelper";


export default defineComponent({
  name: 'PBasicHelp',

  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-help')
    return () => <Tooltip title='sada'>
      <span class={prefixCls}> {getSlot(slots) || <InfoCircleOutlined /> } </span>
    </Tooltip>
  }
})