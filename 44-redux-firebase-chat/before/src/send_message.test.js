import React from 'react';
import faker from "faker";

import {screen } from '@testing-library/react'
import render from "./redux/utils/rtl_render_with_providers";
import userEvent from '@testing-library/user-event'
import SendMessage from "./send_message";
import initialState from "./__mocks__/initialState";
import * as firebaseActions from './redux/firebase_actions';

/**
 * App works fine, but is not testable once include firestore - Couldn't fix.
 * https://github.com/firebase/firebase-js-sdk/issues/315
 * https://github.com/facebook/create-react-app/issues/2590
 *
 * Jest fails with firebase write operation.
 */
describe('SendMessage component', () => {
    it('SendMessage component',

        async () => {
            firebaseActions.sendToFirebase = jest.fn();
            const {
                getByLabelText, store
            } = render( <SendMessage/>, {initialState});

            const addMessageLabel = screen.getByRole('heading', { name: /add message/i });
            expect(addMessageLabel).toBeInTheDocument();

            const addMessageInput = getByLabelText(/add message/i);
            expect(addMessageInput).toHaveValue("");

            const messageContent = faker.lorem.word();
            await userEvent.type(addMessageInput, messageContent)
            expect(addMessageInput).toHaveValue(messageContent);

            const addMessageButton = screen.getByRole("button", { name: /add/i})
            await userEvent.click(addMessageButton);
            expect(firebaseActions.sendToFirebase).toHaveBeenCalledTimes(1);
        })

})
