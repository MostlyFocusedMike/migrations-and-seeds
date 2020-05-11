import React from "react";
import ReactDOM from "react-dom";

import { Hello } from './components/Hello';

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
    </div>,
    document.getElementById("main")
);