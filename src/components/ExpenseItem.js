import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseItem = ({id, description, amount, createdAt}) => (
        <tr>
            <td><Link to={`/edit/${id}`}>{description}</Link></td>
            <td>{amount}</td>
            <td>{createdAt}</td>
        </tr>
);

export default ExpenseItem;