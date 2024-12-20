import { defineComponent } from "vue";
import { Tooltip } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useDesign } from "../../../hooks/useDesign";


export default defineComponent({
  name: 'ModalClose',
  setup(props, { slots }) {
    const { prefixCls } = useDesign('modal-close')
    return () => <div>
      <Tooltip title='关闭'>
        <CloseOutlined />
      </Tooltip>
    </div>
  }
})