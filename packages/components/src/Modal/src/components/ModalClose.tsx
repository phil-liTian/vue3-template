import { computed, defineComponent } from "vue";
import { Tooltip } from 'ant-design-vue'
import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { useDesign } from "../../../hooks/useDesign";
import { booleanType } from "ant-design-vue/es/_util/type";


export default defineComponent({
  name: 'ModalClose',
  props: {
    canFullscreen: booleanType(true),
    fullScreen: booleanType(false),
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useDesign('modal-close')

    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--custom`,
        {
          [`${prefixCls}--can-full`]: props.canFullscreen
        }
      ]
    })

    const handleCancel = (e: Event) => {
      emit('cancel', e)
    }

    const handleFullScreen = (e: Event) => {
      e?.stopPropagation()
      e?.preventDefault()
      emit('fullscreen')
    }

    return () => <div class={getClass.value}>
      {props.canFullscreen &&
        (props.fullScreen ?
          <Tooltip title='还原' placement='bottom'>
            <FullscreenExitOutlined role="close" onClick={handleFullScreen} />
          </Tooltip> :
          <Tooltip title='全屏' placement='bottom'>
            <FullscreenOutlined role="full" onClick={handleFullScreen} />
          </Tooltip>)
      }
      <Tooltip title='关闭' placement='bottom'>
        <CloseOutlined onClick={handleCancel} />
      </Tooltip>
    </div >
  }
})