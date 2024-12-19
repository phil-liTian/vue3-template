import { defineComponent } from "vue";
import { getUserList, login } from './service/index'
import dayjs from "dayjs";

export default defineComponent({
  name: 'App',
  setup() {
    getUserList()
    login({ name: '123', password: undefined, date: dayjs() })
    return () => {
      return <p-modal />
    }
  }
})