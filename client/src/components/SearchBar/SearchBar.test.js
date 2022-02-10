/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
 import React, {useState} from 'react';

 import { SearchBar } from '../index';
 
 const mockedUsedNavigate = jest.fn();
 
 jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 import axios from 'axios'
 jest.mock('axios')


 describe('searchbar', ()=>{

    test('renders', async ()=>{
        const setCategory = jest.fn();

        await axios.get.mockResolvedValue()
        render(<SearchBar setCategory={setCategory} />)
        const form = screen.getByRole('form-submit')
        const category = screen.getByRole('cat-select')
        userEvent.selectOptions(category, ['All'])
        expect(category).toBe('All')
        userEvent.click(form)

    })
 })