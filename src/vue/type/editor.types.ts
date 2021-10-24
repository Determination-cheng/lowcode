import { Node } from '@/object/Node'

export type ComponentDesc = {
  type: string
  x: number
  y: number
}

export enum States {
  Start,
  DragStart,
  Moving,
  Stopped,
  Selected,
  PlacingComponent, // 用户将拖拽组件放下的状态
  AddingComponent, // 组件被添加的状态
}

export enum Actions {
  AUTO = '<auto>',
  EvtDragStart = 0,
  EvtDrag,
  EvtDrop,
  EvtDragEnd,
  StartAddComponent,
}

export type Meta = {
  type: string
  w: number
  h: number
}
