import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <p>This is the info message: {props.info}</p>
    </div>
);

const withAdminInfo = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is an Admin message</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const AdminInfo = withAdminInfo(Info);

const requiresAuth = (WrappedContent) => {
    return (props) => (
        <div>
            {props.isAuth && <p>Successfully Authenticated</p>}
            <WrappedContent {...props}/>
        </div>
    );
};

const AuthInfo = requiresAuth(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info='This is from props' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuth={false} info='This is from props' />, document.getElementById('app'));