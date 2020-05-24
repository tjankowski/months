import { color } from "../utils";
import moment from "moment";

export const actionTypes = {
  STEPS_LOAD: "steps.load",
  STEPS_NEW: "steps.new",
  STEPS_DELETE: "steps.delete",
  GOALS_NEW: "goals.new",
  GOALS_LOAD: "goals.load",
  DATE_NEXT: "date.next",
  DATE_PREVIOUS: "date.previous",
};

export const useActions = (state, dispatch) => ({
  newStep: (date, goal) => {
    dispatch(newStep(date, goal));
  },
  removeStep: (stepId) => {
    dispatch(action(actionTypes.STEPS_DELETE, stepId));
  },
  loadSteps: () => {
    dispatch(action(actionTypes.STEPS_LOAD));
  },
  newGoal: (name, start=moment(), end) => {
    dispatch(newGoal(name, start, end || start.clone().add(1, "years"), color(state.goalIndex)));
  },
  loadGoals: () => {
    dispatch(action(actionTypes.GOALS_LOAD));
  },
  nextMonth: () => {
    dispatch(action(actionTypes.DATE_NEXT));
  },
  prevMonth: () => {
    dispatch(action(actionTypes.DATE_PREVIOUS));
  },
});

export function action(type, payload) {
  return {
    type,
    payload,
  };
}

function newStep(date, goal) {
  return action(actionTypes.STEPS_NEW, {
    date,
    goal,
  });
}

function newGoal(name, start, end, color) {
  return action(actionTypes.GOALS_NEW, {
    name,
    start,
    end,
    color,
  });
}
