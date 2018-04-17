import uuid from 'uuid';

export const addExpense = ({ description = '', notes = '', amount = 0, createdAt = 0 } = {}) => ({
    type : 'ADD_EXPENSE',
    expense : {
        id : uuid(),
        description,
        amount,
        createdAt,
        notes
    }
});

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

export const editExpense = (id, { amount, description, notes, createdAt }) => ({
    type: 'EDIT_EXPENSE',
    expense: {
        id,
        amount,
        description,
        notes,
        createdAt
    }
});