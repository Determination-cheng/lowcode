import { Emitter } from '@/object/Emitter'
import { Topics } from '@/object/Topics'
import { Map as ImmutableMap, List } from 'immutable'

export class Node extends Emitter<Topics> {
  private nodeData: ImmutableMap<string, any>

  constructor(type: string, x: number, y: number, w: number, h: number) {
    super()
    this.nodeData = ImmutableMap({
      type,
      x,
      y,
      w,
      h,
      children: List<Node>(),
    })
  }

  add(child: Node) {
    this.nodeData = this.nodeData.update('children', (children) =>
      children.push(child)
    )
  }

  getType() {
    return this.nodeData.get('type')
  }

  getX() {
    return this.nodeData.get('x')
  }

  getY() {
    return this.nodeData.get('y')
  }

  getW() {
    return this.nodeData.get('w')
  }

  getH() {
    return this.nodeData.get('h')
  }

  getChildren() {
    return this.nodeData.get('children').toJS() as Node[]
  }

  setXY(vec: [number, number]) {
    this.nodeData = this.nodeData
      .set('x', vec[0] + this.nodeData.get('x'))
      .set('y', vec[1] + this.nodeData.get('y'))
  }

  printData() {
    console.log(this.nodeData.toJS())
  }
}
