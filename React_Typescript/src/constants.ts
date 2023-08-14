import * as dayjs from 'dayjs'
import { Status } from './types.d'

export const INITIAL_STATE = {
    name: '',
    date: dayjs().format('YYYY-MM-DD'),
    description: '',
    statusTask: Status.pending
}
