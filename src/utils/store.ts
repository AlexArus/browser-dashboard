import { Action } from 'types/action';
import { GlobalState } from 'types/globalState';
import { ModuleReducer } from 'types/reducer';
import { UpdateObj, updateObj } from 'utils/common';

export const updateGlobalState: UpdateObj<GlobalState> = (state, update) =>
  updateObj(state, update);

export const actionFactory = <M extends keyof GlobalState>(module: M) => <P>(
  reducer?: ModuleReducer<M, P>,
  effect?: Action<P>['effect']
) => (payload: P): Action<P> => {
  const action: Action<P> = { payload };

  if (reducer)
    action.reducer = (action, state) => {
      const moduleState = state[module];
      return updateGlobalState(state, {
        [module]: updateObj(moduleState, reducer(action, moduleState)),
      });
    };

  if (effect) action.effect = effect;

  return action;
};
