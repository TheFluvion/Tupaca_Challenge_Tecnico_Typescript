export interface Task {
    id: string
    name: string
    date: string
    description: string
    statusTask: Status
}

export enum Status {
    finish,
    inProgress,
    pending
}

export type NewTaskAssign = Omit<Task, 'id'>
