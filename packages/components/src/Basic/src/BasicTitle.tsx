/*
 * @author: phil.li
 */
import { defineComponent } from "vue";
import BasicHelp from "./BasicHelp";

export default defineComponent({
  name: 'BasicTitle',
  setup() {
    return () => {
      return <span>
        <slot></slot>
        <BasicHelp />
      </span>
    }
  }
})
