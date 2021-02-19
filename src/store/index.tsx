import React, { useReducer, FC, useContext, useCallback } from 'react';
import { appState } from 'store/app';
import { bookmarksState } from 'store/bookmarks';
import { historyState } from 'store/history';
import { tabsState } from 'store/tabs';
import { topSitesState } from 'store/topSites';
import { Action } from 'types/action';
import { Dispatch } from 'types/dispatch';
import { GlobalState } from 'types/globalState';

export const globalState = {
  app: appState,
  bookmarks: bookmarksState,
  history: historyState,
  tabs: tabsState,
  topSites: topSitesState,
};

const reducer: (state: GlobalState, action: Action<unknown>) => GlobalState = (
  state,
  action
) => action.reducer?.(action, state) ?? state;

const DispatchContext = React.createContext<Dispatch | null>(null);
DispatchContext.displayName = 'DispatchContext';

const StateContext = React.createContext<GlobalState | null>(null);
StateContext.displayName = 'StateContext';

export const StoreProvider: FC = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
});
StoreProvider.displayName = 'StoreProvider';

export const useDispatch = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('Dispatch not defined');
  const dispatchWithSideEffect = useCallback(
    <P,>(action: Action<P>) => {
      if (action.effect) action.effect(action, dispatchWithSideEffect);
      dispatch(action);
    },
    [dispatch]
  );
  return dispatchWithSideEffect;
};

export const useStore = () => {
  const state = useContext(StateContext);
  if (!state) throw new Error('Store not defined');
  return state;
};
