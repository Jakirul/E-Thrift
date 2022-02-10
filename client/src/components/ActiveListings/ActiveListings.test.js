
/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {ActiveListings} from '../index';
import React, {useState} from 'react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('ActiveListings', () =>{
    beforeEach(()=> jest.resetAllMocks())

    test('renders arrow back', () =>{
        const activeItems = {
            'data': [{
                "id": 5,
                "name": "test listing 222",
                "category": "Entertainment",
                "description": "test description",
                "is_claimed": false,
                "time": "2022-02-07",
                "address": "Gower St, London WC1E 6BT",
                "seller": "test"
            }],
            'image': [{
                'item_id':5,
                'img_url': 'lolno.com'
            }]
        }
        render(<ActiveListings 
                isLoading={true}
                // setActiveFragment={setActiveFragment}
                activeItems={activeItems}
                />)
        const header = screen.getByRole('heading')
        expect(header).toBeTruthy()
        // const arrow = screen.getByLabelText('arrowback')
        // expect(arrow).toBeTruthy()

    })
})