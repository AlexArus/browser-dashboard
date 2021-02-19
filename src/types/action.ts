import { Dispatch } from 'types/dispatch';
import { GlobalState } from 'types/globalState';

export type Action<P> = {
  payload: P;
  reducer?: (action: Action<P>, state: GlobalState) => GlobalState;
  effect?: (action: Action<P>, dispatch: Dispatch) => void;
};
