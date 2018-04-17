import { createStore } from "redux";

// Action Generators
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers are pure functions
// Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT' :
            return { count : state.count + action.incrementBy };
        case 'DECREMENT' :
            return { count : state.count - action.decrementBy };
        case 'RESET' :
            return { count : 0 };
        default :
            return state;
    }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 5}));