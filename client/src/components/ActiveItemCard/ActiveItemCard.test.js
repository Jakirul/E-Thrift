import { default as Login } from '.'
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import {ActiveItemCard} from '../index';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const stubProps = {
    id: '1',
    name: 'test item',
    price: '£10',
    category: 'Clothes',
    description: 'test description',
    image_url: 'test image url',
    image_id: 1
}

describe('ActiveItemCard', () => {

    test('renders a card', () => {
        render(
            <ActiveItemCard cardData={stubProps}/>, 
            { wrapper: ReactRouterDom.MemoryRouter}
        );
        const card = screen.getByLabelText('active-item-card');
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(card).toBeInTheDocument();
    });

    test('navigates to product show page on button click', async () => {
        render(
            <ActiveItemCard cardData={stubProps}/>, 
            { wrapper: ReactRouterDom.MemoryRouter}
        );
        const card = screen.getByLabelText('active-item-card');
        userEvent.click(card);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalled();
        });
  
    });
});