import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'PButton',
  setup(props, { slots }) {


    return () => <Button v-slots={{
      default: () => {
        return <div> <p-icon icon='fluent:accessibility-24-regular' /> {slots.default?.()}</div>
      }
    }} />
  }
})