export interface ITodoItem {
  title: string
  completed: boolean
  inColumnId: Id
  id: string | number
}

export interface IColumn {
  text: string
  id: number | string
}

export type Id = number | string
