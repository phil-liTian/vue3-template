/*
 * @author: phil.li
 */
import { defineComponent } from "vue";
import { Tooltip } from 'ant-design-vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'


export default defineComponent({
  name: 'BasicHelp',

  setup(props, { slots }) {
    return () => <Tooltip>
      <span> <InfoCircleOutlined />    </span>
    </Tooltip>
  }
})