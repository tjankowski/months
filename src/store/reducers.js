import moment from "moment";
import { actionTypes } from "./actions";
import { parseMoment, COLORS } from "../utils";

const STATE_KEY = "state";

function parseLocalData(data) {
  return (
    data && {
      ...data,
      date: parseMoment(data.date),
      goals: data.goals.map((goal) => ({
        ...goal,
        start: parseMoment(goal.start),
        end: parseMoment(goal.end),
      })),
    }
  );
}

export function initialState() {
  return (
    parseLocalData(JSON.parse(window.localStorage.getItem(STATE_KEY))) || {
      date: moment().startOf("month"),
      steps: [],
      goals: [],
      goalIndex: 0,
    }
  );
}

function storeLocalData(state) {
  // window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
  console.log(state);
  return state;
}

export function reducer(state, action) {
  return storeLocalData(reducerLogic(state, action));
}

function reducerLogic(state, action) {
  switch (action.type) {
    case actionTypes.DATE_NEXT:
      return {
        ...state,
        date: state.date.clone().add(1, "months"),
      };
    case actionTypes.DATE_PREVIOUS:
      return {
        ...state,
        date: state.date.clone().subtract(1, "months"),
      };
    case actionTypes.STEPS_NEW:
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };
    case actionTypes.STEPS_DELETE:
      return {
        ...state,
        steps: (state.steps || []).filter((step) => step.id !== action.payload),
      };

    case actionTypes.STEPS_LOAD:
      return {
        ...state,
        steps: action.payload,
      };
    case actionTypes.GOALS_NEW:
      if (state.goals.length >= 12) return state;
      return {
        ...state,
        goals: [...state.goals, action.payload],
        goalIndex: (state.goalIndex + 1) % COLORS.length,
      };
    case actionTypes.GOALS_LOAD:
      return {
        ...state,
        goals: action.payload,
      };
    default:
      return state;
  }
}
