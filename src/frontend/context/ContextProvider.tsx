import React, { ReactNode } from 'react';
import AppContext from '.';

interface ContextProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProps> = ({ children }) => {
    const context = {
        test: 'hello there',
    }

    return (
        <AppContext.Provider value={ context }>
            {children}
        </AppContext.Provider>
    );
}

export default ContextProvider;