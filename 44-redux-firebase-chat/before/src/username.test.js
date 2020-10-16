import React from 'react';
import faker from "faker";

import render from "./redux/utils/rtl_render_with_providers";
import userEvent from '@testing-library/user-event'
import Username from './username.js'
import initialState, {username} from "./__mocks__/initialState";

describe('Username component', () => {
    it('Username component',

        async () => {
            const {
                getByText, getByLabelText
            } = render(<Username/>, {initialState});

            const usernameLabel = getByText(/user/i);
            expect(usernameLabel).toBeInTheDocument();

            const usernameInput = getByLabelText(/user/i);
            expect(getByLabelText(/user/i)).toHaveValue(username);

            userEvent.clear(usernameInput);
            const username2 = faker.internet.userName();
            userEvent.type(usernameInput, username2)
            expect(usernameInput).toHaveValue(username2);
        })

})
