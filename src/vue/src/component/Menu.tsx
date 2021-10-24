import { Editor } from '@/object/Editor'
import classes from './styles/drag-drop.module.scss'
import metas from '@/object/Metas'
import { Actions } from '@/vue/type/editor.types'

type MenuProps = { editor: Editor }
type Unwrapped<T> = T extends (infer U)[] ? U : T
export default ({ editor }: MenuProps) => {
  return (
    <div class={classes['item-list']}>
      {metas.map((item) => (
        <div
          draggable={true}
          onDragstart={() => {
            editor.dispatch(Actions.StartAddComponent, item)
          }}
          class={classes['item']}
          key={item.type}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
