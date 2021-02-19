import { Action } from 'types/action';
import { GlobalState } from 'types/globalState';

export type Reducer<T = GlobalState> = (state: T, action: Action<unknown>) => T;

export type ModuleReducer<M extends keyof GlobalState, P> = (
  action: Action<P>,
  state?: GlobalState[M]
) => GlobalState[M];
