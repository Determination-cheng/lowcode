import { defineComponent, provide } from 'vue'
import { Editor } from '@/object/Editor'
import Menu from '@/vue/src/component/Menu'
import { Panel } from '@/vue/src/component/Panel'
import classes from './styles/drag-drop.module.scss'

export default defineComponent({
  setup() {
    const editor = new Editor()
    provide('editor', editor)
    return () => {
      return (
        <div class={classes.page}>
          <Menu editor={editor} />
          <Panel editor={editor} />
        </div>
      )
    }
  },
})
