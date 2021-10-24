import { defineComponent, ref } from 'vue'
import type { VNode, PropType } from 'vue'
import { DragValue } from '@/object/DragValue'
import { deepMerge } from '@/vue/src/util/deepMerge'

type UseDragType = {
  onDragstart?: () => void
  onDragend?: (vec: [number, number]) => void
}

function useDrag({ onDragend, onDragstart }: UseDragType) {
  const value = new DragValue()
  const diffX = ref(value.getDiffX())
  const diffY = ref(value.getDiffY())
  const handlers = {
    onDragstart(e: DragEvent) {
      value.start(e)
      onDragstart && onDragstart()
    },
    onDrag(e: DragEvent) {
      value.update(e)
      diffX.value = value.getDiffX()
      diffY.value = value.getDiffY()
    },
    onDragend(e: DragEvent) {
      value.update(e)
      onDragend && onDragend([value.getDiffX(), value.getDiffY()])
    },
  }

  return {
    handlers,
    diffX,
    diffY,
  }
}

function addPropsToVNode(vNode: VNode, props: Record<string, any>) {
  vNode.props = deepMerge(vNode.props, props)
  return vNode
}

export const Draggable = defineComponent({
  props: {
    initialPosition: {
      type: Array as any as PropType<[number, number]>,
    },
    onDragstart: {
      type: Function as PropType<() => void>,
    },
    onDragend: {
      type: Function as PropType<(vec: [number, number]) => void>,
    },
  },
  setup(props, ctx) {
    const { handlers, diffX, diffY } = useDrag({
      onDragstart: props.onDragstart,
      onDragend: props.onDragend,
    })

    return () => {
      let vNode: VNode = ctx.slots.default!()[0]
      vNode = addPropsToVNode(vNode, {
        ...handlers,
        Draggable: true,
        style: {
          position: 'absolute',
          left: `${props.initialPosition?.[0] || 0}px`,
          top: `${props.initialPosition?.[1] || 0}px`,
          transform: `translate(${diffX.value}px, ${diffY.value}px)`,
        },
      })
      return vNode
    }
  },
})
