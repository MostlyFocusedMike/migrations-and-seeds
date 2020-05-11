import React, { useContext } from "react";
import AppContext from '../context';

export interface HelloProps {
    compiler: string;
    framework: string;
}

// you don't need to include the JSX.Element, that's implied
// components have to return a JSX.Element or null
export const Hello: React.FC<HelloProps> = (props): JSX.Element => {
    const { test } = useContext(AppContext);
    console.log('test', test);
    return (
        <h1>Hello from {props.compiler} and {props.framework}!</h1>
    )
}