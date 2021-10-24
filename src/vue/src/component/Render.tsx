import { Node } from '@/object/Node'
import { defineComponent, inject, ref } from 'vue'
import { Draggable } from '@/vue/src/component/Draggable'
import { Actions } from '@/vue/type/editor.types'
import { Topics } from '@/object/Topics'
import { Editor } from '@/object/Editor'

type SkedoComponent = { node: Node }

//* 渲染组件
// 根组件
const Root = ({ node }: SkedoComponent) => {
  const children = node.getChildren()
  return (
    <div
      data-skedo={'root'}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {children.map((node, i) => (
        <Render key={i} node={node} />
      ))}
    </div>
  )
}
// 基本组件(处于根组件之下)
const DraggableItem = ({ node }: SkedoComponent) => {
  const editor = inject('editor') as Editor
  return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      onDragstart={() => editor.dispatch(Actions.EvtDragStart, node)}
      onDragend={(vec) => editor.dispatch(Actions.EvtDragEnd, vec)}
    >
      {renderBasicCmp(node)}
    </Draggable>
  )
}

//* 基本组件渲染函数
function renderBasicCmp(node: Node) {
  switch (node.getType()) {
    case 'image':
      return (
        <div
          style={{
            width: '450px',
            height: '315px',
            backgroundImage: "url('/assets/TestImg.jpg')",
          }}
        />
      )
    case 'rect':
      return (
        <div style={{ width: '80px', height: '80px', background: 'yellow' }} />
      )
    case 'text':
      return <h2>测试文本组件</h2>
  }
}

//* 渲染函数
function render(node: Node) {
  switch (node.getType()) {
    case 'root':
      return <Root node={node} />
    case 'text':
    case 'rect':
    case 'image':
      return <DraggableItem node={node} />
    default:
      throw new Error(`unsupported node type: ${node.getType()}`)
  }
}

//* 基本渲染组件
// 所有的组件渲染都要走这里，方便对所有的渲染组件进行管理
export const Render = defineComponent({
  props: {
    node: {
      type: Node,
      required: true,
    },
  },
  setup({ node }) {
    const ver = ref(0)
    node
      .on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved])
      .subscribe(() => ver.value++)

    return () => (
      //* 通过引用 ver.value 通知 vue 进行更新
      <ResponsiveWrapper key={ver.value} render={() => render(node)} />
    )
  },
})

function ResponsiveWrapper({ render }: { render: () => JSX.Element }) {
  return render()
}
