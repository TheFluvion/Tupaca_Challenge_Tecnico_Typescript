import { Status } from './types.d'
import * as dayjs from 'dayjs'

export const INITIAL_STATE = {
    name: '',
    date: dayjs().format('YYYY-MM-DD'),
    description: '',
    statusTask: Status.pending
}