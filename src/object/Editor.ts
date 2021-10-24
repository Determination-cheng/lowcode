import { Node } from '@/object/Node'
import { StateMachine } from '@/object/StateMachine'
import { Actions, Meta, States } from '@/vue/type/editor.types'
import { Topics } from '@/object/Topics'

export class Editor extends StateMachine<States, Actions, Topics> {
  private readonly root: Node

  constructor() {
    super(States.Start)
    this.root = new Node('root', 0, 0, 800, 800)
    this.describeAddingComponent()
    this.describeDragging()
  }

  getRoot() {
    return this.root
  }

  private describeDragging() {
    let dragNode: Node
    this.register(
      States.Start,
      States.DragStart,
      Actions.EvtDragStart,
      (node: Node) => {
        dragNode = node
      }
    )
    this.register(
      States.DragStart,
      States.Stopped,
      Actions.EvtDragEnd,
      (vec: [number, number]) => {
        dragNode!.setXY(vec)
        dragNode!.emit(Topics.NodePositionMoved)
      }
    )
    this.register(States.Stopped, States.Start, Actions.AUTO, () => {})
  }

  private describeAddingComponent() {
    let componentToPlace: Meta | null = null
    let addVector = [0, 0]
    this.register(
      States.Start,
      States.PlacingComponent,
      Actions.StartAddComponent,
      (meta) => {
        componentToPlace = meta
      }
    )
    this.register(
      States.PlacingComponent,
      States.PlacingComponent,
      Actions.EvtDrag,
      (vec: [number, number]) => {
        addVector = vec
      }
    )
    this.register(
      States.PlacingComponent,
      States.AddingComponent,
      Actions.EvtDrop,
      () => {
        if (!componentToPlace) throw new Error('no component to create')
        const node = new Node(
          componentToPlace.type,
          addVector[0] - componentToPlace.w / 2,
          addVector[1] - componentToPlace.h / 2,
          componentToPlace.w,
          componentToPlace.h
        )
        this.root.add(node)
        this.root.emit(Topics.NodeChildrenUpdated)
      }
    )
    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      console.log('auto reset')
    })
  }
}
