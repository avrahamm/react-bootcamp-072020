import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';

import {screen, render} from '@testing-library/react'
import Messages from './messages.js'
import reducer from './redux/reducers/index';

describe('Messages component', () => {
    it('assure messages in the dom',
        async () => {

            const initialState = {
                messages: {
                    messages: [
                        {
                            id: 'QaJmVJ9saVYOgtgOyiuQ',
                            from: "a1",
                            text: "Ha1"
                        },
                        {
                            id: 'QaJmVJ9saVYOgtgOyirr',
                            from: "a2",
                            text: "Ha2"
                        }
                    ]
                },
                rooms: {rooms: [], activeRoomId: 0},
                account: {username: 'guest'}
            };

            const myStore = createStore(reducer, initialState);

            const {
                getByText,
                findByText, findAllByRole
            } = render(
                <Provider store={myStore}>
                    <Messages/>
                </Provider>
            );

            expect(getByText(/messages/i))
                .toBeInTheDocument();
            const messagesByRole = await findAllByRole("message-item");
            expect(messagesByRole).toHaveLength(2);
            const messageByText = await findByText(/ha1/i);
            expect(messageByText).toBeInTheDocument();
        })

})
