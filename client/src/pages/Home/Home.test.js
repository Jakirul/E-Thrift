/**
 * @jest-environment jsdom
 */
 import axios from 'axios';
 jest.mock('axios');
 
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {Home} from '../index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Home', ()=>{

    test('renders', async ()=>{
        const recent = {
            data: [
                {
                    "id": 5,
                    "name": "test listing 222",
                    "category": "Entertainment",
                    "description": "test description",
                    "is_claimed": false,
                    "time": "2022-02-07",
                    "address": "Gower St, London WC1E 6BT",
                    "seller": "test"
            }],
            image: [{
                "id": 5,
                "item_id": 5,
                "img_url": "image/upload/v1644253491/drtd8rn0kxgt3ibuoctz.jpg"
            }]
        }
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        window.localStorage.__proto__.setItem = jest.fn();

        await axios.get.mockResolvedValue({data: recent})
        render(<Home />)
        await waitFor(()=> expect(screen.getByLabelText('carousel').toBeTruthy()))
    })
})
