import * as React from 'react';


export const Home = (props) => {
    return(
        <>
           <h1> Home Page </h1>
           <p>{props.history.location.pathname}</p>
        </>
    );
}