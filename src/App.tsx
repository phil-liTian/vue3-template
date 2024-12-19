import { defineComponent } from "vue";
import { getError, getUserList, getUserListFail, login } from './service/index'
import dayjs from "dayjs";

export default defineComponent({
  name: 'App',
  setup() {
    // getUserList()
    // const a = async () => {
    //   const res = await login({ name: '123', password: undefined, date: dayjs() })
    //   console.log('res', res);
    // }

    // a()

    // getUserListFail()

    getError()


    return () => {
      return <p-modal />
    }
  }
})