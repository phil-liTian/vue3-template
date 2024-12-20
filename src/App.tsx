import { defineComponent } from "vue";
import Demo from "./views/demo.vue";
export default defineComponent({
  name: 'App',
  setup() {
    return () => <Demo />
  }
})