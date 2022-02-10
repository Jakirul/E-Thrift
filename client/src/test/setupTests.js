import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
global.React = React;
global.render = render;
global.userEvent = userEvent;

// import React, {useContext, useState} from 'react';

// import { render } from '@testing-library/react';

// import '@testing-library/jest-dom';
// import UserContext from '../App'; 

// const AuthedProviders = ({children}) =>{
    
//     const mockContext  = 'test'

//     const [username, setUsername] = useState(mockContext)
//     return (
//         <UserContext.Provider value={{username, setUsername}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// const renderWithProviders = (ui, options) => render(ui, {wrapper: AuthedProviders, ...options})

// global.renderWithProviders = renderWithProviders;
// global.React = React;
// // global.render = render;
// // global.userEvent = userEvent;
