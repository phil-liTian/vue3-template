import { defineComponent, onMounted, ref, unref, nextTick, computed, watch } from "vue";
import { BooleanType, NumberType, StringType } from "../../hooks";
import Bar from './Bar'
import './style/index.less'


export default defineComponent({
  name: 'ScrollBar',
  props: {
    tag: StringType('div'),
    native: BooleanType(false),
    scrollHeight: NumberType(0)
  },
  setup(props, { slots }) {
    const { native } = props
    const sizeWidth = ref('0');
    const sizeHeight = ref('0');
    const moveX = ref(0);
    const moveY = ref(0);
    const wrap = ref();

    const update = () => {
      if (!unref(wrap)) return;
      const heightPercentage = (unref(wrap).clientHeight * 100) / unref(wrap).scrollHeight;
      const widthPercentage = (unref(wrap).clientWidth * 100) / unref(wrap).scrollWidth;
      
      sizeHeight.value = heightPercentage < 100 ? heightPercentage + '%' : '';
      sizeWidth.value = widthPercentage < 100 ? widthPercentage + '%' : '';
    };

    const handleScroll = (e) => {
      if ( native ) return
      moveY.value = (unref(wrap).scrollTop * 100) / unref(wrap).clientHeight;
      moveX.value = (unref(wrap).scrollLeft * 100) / unref(wrap).clientWidth;
    }

    onMounted(() => {
      if ( props.native ) return
      nextTick(update)
    })

    watch(() => props.scrollHeight, (val) => {
      if ( native ) return
      update()
    }, { immediate: true })

    const wrapClass = computed(() => {
      return [
        'scrollbar__wrap',
        native ? '' : 'scrollbar__wrap--hidden-default'
      ]
    })

    return () => <div class='scrollbar'>
      <div ref={wrap} class={wrapClass.value} onScroll={handleScroll}>
        <div class={'scrollbar__view'}>
          {slots.default?.()}
        </div>
      </div>
      {!props.native && <>
        <Bar move={moveX.value} size={sizeWidth.value} />
        <Bar move={moveY.value} vertical size={sizeHeight.value} />
      </>}
    </div>
  }
})