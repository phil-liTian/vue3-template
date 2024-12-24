import { defineComponent } from "vue";
import Demo from "./views/demos/index.vue";
export default defineComponent({
  name: 'App',
  setup() {
    return () => <Demo />
  }
})