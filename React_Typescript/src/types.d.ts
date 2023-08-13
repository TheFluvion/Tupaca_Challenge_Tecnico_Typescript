export interface Task {
    id: string
    name: string
    date: string
    description: string
    statusTask: Status
}

export enum Status {
    pending,
    inProgress,
    finish
}

export enum SortBy {
    NONE = '',
    NAME = 'name',
    DATE = 'date'
}

export type NewTaskAssign = Omit<Task, 'id'>
