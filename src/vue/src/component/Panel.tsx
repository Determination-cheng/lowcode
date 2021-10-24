import { Editor } from '@/object/Editor'
import { Render } from '@/vue/src/component/Render'
import classes from './styles/drag-drop.module.scss'
import { Actions } from '@/vue/type/editor.types'

type PanelProps = { editor: Editor }
export const Panel = ({ editor }: PanelProps) => {
  return (
    <div
      class={classes.panel}
      onDragover={(e) => {
        e.preventDefault()
        editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY])
      }}
      onDrop={(e) => {
        e.preventDefault()
        editor.dispatch(Actions.EvtDrop)
      }}
    >
      <Render node={editor.getRoot()} />
    </div>
  )
}
