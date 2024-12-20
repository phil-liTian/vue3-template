import { defineComponent, nextTick, ref, unref, watch } from "vue";
import Iconify from '@purge-icons/generated';
import { propTypes } from '@phil/types'



export default defineComponent({
  name: 'PIcon',
  props: {
    icon: propTypes.string.isRequired,
    color: propTypes.string,
    size: propTypes.oneOfType([propTypes.number, propTypes.string])
  },
  setup(props) {
    const { icon } = props
    const elRef = ref()
    const update = async () => {
      const el: any = unref(elRef);
      if (!el) return;

      await nextTick()
      if (!icon) return
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      el.textContent = '';
      el.appendChild(span);
    }

    watch(() => props.icon, update, { flush: 'post', immediate: true })

    return () => <span ref={elRef}></span>
  }
})