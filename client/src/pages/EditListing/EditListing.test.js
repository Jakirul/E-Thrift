/**
 * @jest-environment jsdom
 */
 import axios from 'axios';
 jest.mock('axios');
 
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {EditListing} from '../index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('EditListring', ()=>{

    // test('renders', ()=>{
    //     render(<EditListing />)
    // })
    // beforeEach(()=>{
    //     render(<EditListing />)
    //     jest.mockReset()
    // })
    test('fetches stuff', async ()=>{
        const mock = {
            "data": {
                "id": 5,
                "name": "test listing 222",
                "category": "Entertainment",
                "description": "test description",
                "is_claimed": false,
                "time": "2022-02-07",
                "address": "Gower St, London WC1E 6BT",
                "seller": "test"
            },
            "photo": [
                {
                    "id": 10,
                    "item_id": 5,
                    "img_url": "image/upload/v1644253491/drtd8rn0kxgt3ibuoctz.jpg"
                },
                {
                    "id": 11,
                    "item_id": 5,
                    "img_url": "image/upload/v1644253491/n1e7ypakdwx0cqa8wn3c.jpg"
                }
            ]
        }
        await axios.get.mockResolvedValue({data: mock})
        render(<EditListing />)
        
        await waitFor(()=> expect(screen.getByLabelText('submit')).toBeTruthy())
        //const submit = screen.getAllByLabelText('submit')
        await axios.get.mockResolvedValue({data: mock})
        userEvent.click(submit)


    })
})