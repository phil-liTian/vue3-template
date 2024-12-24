import { booleanType } from "ant-design-vue/es/_util/type";
import { defineComponent, ref, unref, watch, nextTick, computed, watchEffect, onMounted } from "vue";
import { ScrollContainer } from "../../../components";
import { NumberType } from "../../../hooks";
import { propTypes } from "@phil/types";

export default defineComponent({
  name: "ModalWrapper",
  inheritAttrs: false,
  props: {
    fullScreen: booleanType(false),
    open: booleanType(false),
    minHeight: NumberType(200),
    height: NumberType(),
    useWrapper: booleanType(true),
    modalHeaderHeight: propTypes.number.def(57),
    modalFooterHeight: propTypes.number.def(53),
  },
  emits: ['height-change'],
  setup(props, { slots, expose, emit }) {
    const { open } = props
    const wrapperRef = ref()
    const spinRef = ref()
    let realHeight = ref(0)
    const realHeightRef = ref(0)

    watch(() => props.fullScreen, (v) => {
      setModalHeight()
    }, { flush: 'post' })

    const spinStyle = computed(() => {
      return {
        minHeight: `${props.minHeight}px`,
        [props.fullScreen ? 'height' : 'maxHeight']: `${unref(realHeightRef)}px`
      }
    })

    const setModalHeight = async () => {
      if (!open) return
      await nextTick()
      const wrapperRefDom = unref(wrapperRef)
      console.log('wrapperRefDom', wrapperRefDom);
      
      if (!wrapperRefDom) return

      const bodyDom = (wrapperRefDom as any).$el.parentElement;
      if (!bodyDom) return;
      bodyDom.style.padding = '0';

      await nextTick()
      try {
        // 整个ant-modal
        const modalDom = bodyDom.parentElement && bodyDom.parentElement.parentElement
        console.log('modalDom', modalDom);

        if (!modalDom) return

        const modalRect = getComputedStyle(modalDom).top

        const modalTop = Number.parseInt(modalRect)

        // 最大高度为视口高度 - header高度 - footer高度 - 距离顶部高度的二倍(确保上下间距相同)
        let maxHeight = window.innerHeight - props.modalHeaderHeight - props.modalFooterHeight
        // - modalTop * 2

        const spinEl = spinRef.value
        if ( !spinEl ) return
        await nextTick()
        realHeight.value = spinEl.scrollHeight
        console.log('realHeight', realHeight);
        
        if ( props.fullScreen ) {
          realHeightRef.value = window.innerHeight - props.modalFooterHeight - props.modalHeaderHeight - 28
        } else {
          realHeightRef.value = props.height ? props.height : realHeight.value > maxHeight ? maxHeight : realHeight.value
        }
        emit('height-change', unref(realHeightRef))
      } catch (error) {
        console.error('error', error)
      }
    }

    watchEffect(() => {
      props.useWrapper && setModalHeight()
    })
    
    return () => <ScrollContainer ref={wrapperRef} scrollHeight={realHeight.value}>
      <div ref={spinRef} style={spinStyle.value}>
        {slots.default?.()}
      </div>
    </ScrollContainer>
  }
}) 