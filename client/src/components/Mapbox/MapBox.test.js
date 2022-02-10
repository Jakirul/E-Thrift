
/**
 * @jest-environment jsdom
 */

 import { render, screen, waitFor } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import React, {useState} from 'react';

 import { Mapbox } from '../index';
 
 const mockedUsedNavigate = jest.fn();
 
 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 describe('mapbox', ()=>{

    test('renders mapbox', ()=>{
        const setMap = jest.fn()
        const setMapboxGl = jest.fn()

        render(<Mapbox setMap={setMap} setMapboxGl={setMapboxGl} />)
        waitFor(()=>{
            const container = screen.getByLabelText('map-container')
            expect(container).toBeTruthy()
        })
    })
 })