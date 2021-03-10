import { Action } from 'types/action';

export type Dispatch<T = any> = React.Dispatch<Action<T>>;
