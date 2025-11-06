//Step 1 : Importing react from 'react';
//Step 2: creating a function that returns JSX
//Step 3: importing this component and using it in app.js
//Step 4: running and building

import React from "react";

function Welcome(props) {
    return (
        <div>
            <h1>welcome,{props.name}</h1>
            <p>welcome to our first react component</p>

        </div>
    );
}

export default Welcome;