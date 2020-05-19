import React, { createContext, useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducers";
import { useActions } from "./actions";
import { applyMiddleware } from "./middleware";

export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const actions = useActions(state, applyMiddleware(dispatch));
  useEffect(() => {
    actions.loadGoals();
    actions.loadSteps();
  }, []);
  return (
    <StoreContext.Provider value={{ state, actions }}>
      {children}
    </StoreContext.Provider>
  );
};
