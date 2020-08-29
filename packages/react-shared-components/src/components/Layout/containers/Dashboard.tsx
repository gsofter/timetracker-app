import * as React from 'react';


export const Dashboard = (props) => {
    return(
        <>
           <h1> Dashboard Page </h1>
           <p>{props.history.location.pathname}</p>
        </>
    );
}