import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

const addExpense = ({ description = '', notes = '', amount = 0, createdAt = 0 } = {}) => ({
    type : 'ADD_EXPENSE',
    expense : {
        id : uuid(),
        description,
        amount,
        createdAt
    }
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = ({ id, amount } = {}) => ({
    type: 'EDIT_EXPENSE',
    expense: {
        id,
        amount
    }
});

const setFilters = (filter) => ({
    type: 'SET_FILTERS',
    filter
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

const expenseReducerDefaultState = [];

const filtersReducerDefaultState = {
    text : '',
    sortBy : 'date',
    createdDate : undefined,
    endDate : undefined
};

const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE' :
            return [...state, action.expense];
        case 'REMOVE_EXPENSE' :
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE' :
            return state.map((expense) => {
                if(expense.id === action.expense.id) {
                    return {...expense, ...action.expense};
                } else {
                    return expense;
                }
            })
        default :
            return state;
    }
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTERS' :
            return {...state, ...action.filter};
        case 'SORT_BY_DATE' :
            return {...state, sortBy : 'date'};
        case 'SORT_BY_AMOUNT' :
            return {...state, sortBy : 'amount'};
        case 'SET_START_DATE' :
            return {...state, createdDate: action.startDate};
        case 'SET_END_DATE' :
            return {...state, endDate : action.endDate};
        default :
            return state;
    }
};

const store = createStore(combineReducers({
    expenses : expenseReducer,
    filters : filtersReducer
}));

const filterExpenses = (expenses, {text, sortBy, createdDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof createdDate !== 'number' || expense.createdAt >= createdDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); 
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date')
            return a.createdAt < b.createdAt ? 1 : -1;
        else if(sortBy === 'amount')
            return a.amount > b.amount ? 1 : -1;
    })
};

const unsubscribe = store.subscribe(() => {
    const curState = store.getState();
    console.log(filterExpenses(curState.expenses, curState.filters));
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: -1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 100, createdAt: 1000 }));

console.log(expenseOne);
console.log(expenseTwo);

// store.dispatch(removeExpense({ id : expenseOne.expense.id }));

// store.dispatch(editExpense({ id : expenseTwo.expense.id, amount: 500 }));

// store.dispatch(setFilters({ text: 'rent' }));

// store.dispatch(setFilters({ text: '' }));

// store.dispatch(sortByDate());

store.dispatch(sortByAmount());

// store.dispatch(setStartDate(1001));

// store.dispatch(setStartDate());

// store.dispatch(setEndDate(125));

// store.dispatch(setEndDate());

const demoState = {
    expenses : [{
        id : 'asdfghjkl',
        description : 'April Rent',
        notes : 'Sample notes',
        amount : 500000,
        createdAt : 0
    }],
    filters : {
        text : 'rent',
        sortBy : 'amount',
        createdDate : undefined,
        endDate : undefined
    }
};