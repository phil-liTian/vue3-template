/*
 * @author: phil.li
 */
import { computed, CSSProperties, defineComponent } from "vue";
import { Tooltip } from 'ant-design-vue'
import { isArray, isString } from '@phil/utils'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { useDesign } from "../../hooks/useDesign";
import { getSlot } from "../../helpers/tsxHelper";
import { propTypes } from "@phil/types";
import { booleanType } from "ant-design-vue/es/_util/type";
import { StringType } from "../../hooks";
import './style/BasicHelp.less'


export default defineComponent({
  name: 'PBasicHelp',
  props: {
    text: propTypes.oneOfType([String, Array]),
    showIndex: booleanType(),
    color: StringType('#ffffff'),
    fontSize: StringType('14px'),
    placement: StringType('right'),
    maxWidth: StringType('600px')
  },

  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-help')
    const { maxWidth, placement } = props
    const getOverlayStyle = computed((): CSSProperties => {
      return { maxWidth }
    })

    const renderTitle = () => {
      const textList = props.text
      if (isString(textList)) {
        return <p>{textList}</p>
      }

      if (isArray(textList)) {
        return textList.map((text, index) =>
          <p key={index}>
            <>
              {props.showIndex ? `${index + 1}.` : ''}
              {text}
            </>
          </p>
        )
      }

      return <div>{textList}</div>
    }

    return () =>
      <Tooltip
        placement={props.placement}
        overlayStyle={getOverlayStyle.value}
        title={renderTitle()}>
        <span class={prefixCls}> {getSlot(slots) || <InfoCircleOutlined />} </span>
      </Tooltip>
  }
})