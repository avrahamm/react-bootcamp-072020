import React from 'react';

import render from "./redux/utils/rtl_render_with_providers";
import Messages from './messages.js'
import initialState from "./__mocks__/initialState";

describe('Messages component', () => {
    it('assure messages in the dom',
        async () => {
            const {
                getByText,
                findByText, findAllByRole,
                store
            } = render(<Messages/>, {initialState});

            expect(getByText(/messages/i))
                .toBeInTheDocument();
            const messagesByRole = await findAllByRole("message-item");
            const messagesLength = store.getState().messages.messages.length;
            expect(messagesByRole).toHaveLength(messagesLength);

            const {from:lastMessageFrom, text:lastMessageText} = store.getState().messages.messages[messagesLength - 1];
            const messageByFrom = await findByText(lastMessageFrom);
            expect(messageByFrom).toBeInTheDocument();
            const messageByText = await findByText(lastMessageText);
            expect(messageByText).toBeInTheDocument();
        })
})
