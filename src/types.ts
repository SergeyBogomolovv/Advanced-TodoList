export interface ITodoItem {
  title: string
  completed: boolean
  text: string
  type?: string
  id: string | number
}

export interface IColumn {
  text: string
  id: number | string
}

export type Id = number | string
