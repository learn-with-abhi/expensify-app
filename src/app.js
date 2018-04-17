import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setFilters } from './actions/filters';
import filterExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    const curState = store.getState();
    console.log(filterExpenses(curState.expenses, curState.filters));
});

store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 100, createdAt: 2000 }));
store.dispatch(addExpense({ description: 'telephone bill', amount: 200, createdAt: 3000 }));
store.dispatch(addExpense({ description: 'EB bill', amount: 10, createdAt: 4000 }));
store.dispatch(setFilters({ text: 'bill' }));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

const appRoot = document.getElementById('app');

ReactDOM.render(jsx, appRoot);