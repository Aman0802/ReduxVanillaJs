const INITIAL_STATE = {
  count: 0,
};

const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    // reducer returns the new state
    state = reducer(state, action);
    // We loop and call for each ui update.
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    // below is the unsubscribe function
    return () => {
      listeners = listeners.filter((l = l != listener));
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(counterReducer);

store.subscribe(
  () => (document.querySelector("#count").innerHTML = store.getState().count)
);

document.querySelector("#count").innerHTML = INITIAL_STATE.count;

//called onClick from the button from html file
increment = () => {
  store.dispatch({ type: "INCREMENT" });
};

//called onClick from the button from html file
decrement = () => {
  store.dispatch({ type: "DECREMENT" });
};
