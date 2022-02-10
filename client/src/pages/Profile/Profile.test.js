// import Profile from '.'
// import { screen, render, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

// import * as helpers from '../../helpers/requests';

// const mockUser = { 
//     "firstName": "John",
//     "lastName": "Smith",
//     "username": "JohnSmithTest",
//     "email": "johnsmith@gmail.com",
//     "phoneNumber": "0800001066",
//     'avatarUrl': 'testurl',
//     'bio': 'test bio',
// }

// const mockRating = {
//     rating: 5,
//     count: 200
// }

// describe('Profile', () => {
//     test('it renders the page', async () => {
//         render(<Profile />, { wrapper: MemoryRouter });
//         const getProfilSpy = jest.spyOn(helpers, 'getProfile');
//         const getRatingSpy = jest.spyOn(helpers, 'getRating');
//         getProfilSpy.mockReturnValue(mockUser);
//         getRatingSpy.mockReturnValue(mockRating);

//         await waitFor(() => {
//             const heading = screen.getByRole("heading");
//             expect(heading.textContent).toMatch("JohnSmithTest");
//         });
//     }); 
// });