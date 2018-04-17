import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();

console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description : props.expense ? props.expense.description : '',
            amount : props.expense ? (props.expense.amount / 100).toString() : '',
            notes : props.expense ? props.expense.notes : '',
            createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused : false,
            error : ''
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const notes = e.target.value;
        this.setState(() => ({ notes }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused : focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({ error : 'Please enter description and amount' }));
        } else {
            this.setState(() => ({ error : '' }));
            this.props.onSubmit({
                description : this.state.description,
                amount : parseFloat(this.state.amount * 100),
                createdAt : this.state.createdAt.valueOf(),
                note : this.state.notes
            });
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type='text' placeholder='Description' autoFocus value={this.state.description} onChange={this.onDescriptionChange} />
                    <input type='number' placeholder='Amount' value={this.state.amount} onChange={this.onAmountChange} />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea placeholder='Add a note for the Expense (optional)' onChange={this.onNoteChange}></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}