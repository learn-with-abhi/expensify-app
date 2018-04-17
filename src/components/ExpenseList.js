import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import filterExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h3>Expense List</h3>
        <table>
        <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Created Date</th>
        </tr>
        {props.expenses.map((expense) => <ExpenseItem key={expense.id} {...expense} />)}
        </table>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses : filterExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(ExpenseList);