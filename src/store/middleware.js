import { actionTypes, action } from "./actions";
import database from "../api/firebase";
import { formatMoment, parseMoment } from "../utils";

const UID = "oodAJSTRphZMRTg46qKAR3i2wr62";

export const applyMiddleware = (dispatch) => (action) => {
  switch (action.type) {
    case actionTypes.GOALS_NEW:
      return newGoal(dispatch, action.payload);
    case actionTypes.GOALS_LOAD:
      return goals(dispatch, action.payload);
    case actionTypes.STEPS_NEW:
      return newStep(dispatch, action.payload);
    case actionTypes.STEPS_DELETE:
      return removeStep(dispatch, action.payload);
    case actionTypes.STEPS_LOAD:
      return steps(dispatch, action.payload);

    default:
      dispatch(action);
  }
};

const goalsConverter = {
  toFirestore: (data) => ({
    ...data,
    start: formatMoment(data.start),
    end: formatMoment(data.end),
    createdBy: UID,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      start: parseMoment(data.start),
      end: parseMoment(data.end),
    };
  },
};

const stepsConverter = {
  toFirestore: (step) => ({
    ...step,
    date: formatMoment(step.date),
    createdBy: UID,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      date: parseMoment(data.date),
    };
  },
};

const stepsColllection = "steps";

function steps(dispatch) {
  fetchDocuments(
    dispatch,
    actionTypes.STEPS_LOAD,
    stepsColllection,
    stepsConverter
  );
}

function newStep(dispatch, data) {
  return addDocument(
    dispatch,
    actionTypes.STEPS_NEW,
    data,
    stepsColllection,
    stepsConverter
  );
}

function removeStep(dispatch, id) {
  return deleteDocument(
    dispatch,
    actionTypes.STEPS_DELETE,
    id,
    stepsColllection
  );
}

const goalsColllection = "goals";

function goals(dispatch) {
  fetchDocuments(
    dispatch,
    actionTypes.GOALS_LOAD,
    goalsColllection,
    goalsConverter
  );
}

function newGoal(dispatch, data) {
  return addDocument(
    dispatch,
    actionTypes.GOALS_NEW,
    data,
    goalsColllection,
    goalsConverter
  );
}

function fetchDocuments(dispatch, actionType, collection, converter) {
  database
    .collection(collection)
    .withConverter(converter)
    .where("createdBy", "==", UID)
    .get()
    .then((querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => doc.data());
      dispatch(action(actionType, items));
    });
}

function addDocument(dispatch, actionType, data, collection, converter) {
  return database
    .collection(collection)
    .withConverter(converter)
    .add(data)
    .then((docRef) =>
      dispatch(
        action(actionType, {
          ...data,
          id: docRef.id,
        })
      )
    );
}

function deleteDocument(dispatch, actionType, id, collection) {
  return database
    .collection(collection)
    .doc(id)
    .delete()
    .then(() =>
      dispatch(
        action(actionType, id)
      )
    );
}
