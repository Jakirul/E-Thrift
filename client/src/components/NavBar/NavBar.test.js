/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import React, {useState} from 'react';

 import { NavBar } from '../index';
 
 const mockedUsedNavigate = jest.fn();
 const mockedUseLocation = jest.fn()
 
 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
   useLocation: () => mockedUseLocation
 }));

 describe('navbar', ()=>{

    test('renders', ()=>{
        const logout = jest.fn()
        const username = 'test'
        render(<NavBar username={username} logOut={logout}/>)
        const nav = screen.getByLabelText('navbar')
        expect(nav).toBeTruthy()
    })

    test('renders', ()=>{
        const logout = jest.fn()
        const username = null
        render(<NavBar username={username} logOut={logout}/>)
        const nav = screen.getByLabelText('navbar')
        expect(nav).toBeTruthy()
    })

 })
