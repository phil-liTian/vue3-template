import { computed, CSSProperties, defineComponent, nextTick, onMounted, ref, unref, watch } from "vue";
import Iconify from '@purge-icons/generated';
import { propTypes } from '@phil/types'
import { classNames, isString } from '@phil/utils'
import './style/icon.less'



export default defineComponent({
  name: 'PIcon',
  props: {
    icon: propTypes.string.isRequired,
    color: propTypes.string,
    size: propTypes.oneOfType([propTypes.number, propTypes.string]).def(16)
  },
  setup(props) {
    const { icon, size, color } = props
    const elRef = ref()

    const getWrapStyle = computed((): CSSProperties => {
      let fs = size;
      if (isString(size)) {
        fs = parseInt(size as string, 10);
      }

      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex',
      };
    });

    const update = async () => {
      const el: any = unref(elRef);
      console.log('el', el);

      if (!el) return;

      await nextTick()
      if (!icon) return

      const svg = Iconify.renderSVG(icon, {});

      if (svg) {
        el.textContent = '';
        el.appendChild(svg);
      } else {
        const span = document.createElement('span');
        span.className = 'iconify';
        span.dataset.icon = icon;
        el.textContent = '';
        el.appendChild(span);
      }


    }

    watch(() => props.icon, update, { flush: 'post', immediate: true })

    onMounted(update)


    return () => {
      const cls = classNames('app-iconify', 'anticon')
      return <span style={getWrapStyle.value} class={[]} ref={elRef}></span>
    }
  }
})