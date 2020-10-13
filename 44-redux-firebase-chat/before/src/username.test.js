import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
import faker from "faker";

import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Username from './username.js'
import reducer from './redux/reducers/index';

describe('Username component', () => {
    it('Username component',

        async () => {
            const username = "www" ; //faker.internet.userName();
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
                account: {username }
            };

            const myStore = createStore(reducer, initialState);

            const {
                getByText, getByLabelText
            } = render(
                <Provider store={myStore}>
                    <Username/>
                </Provider>
            );

            const usernameLabel = getByText(/user/i);
            expect(usernameLabel).toBeInTheDocument();

            const usernameInput = getByLabelText(/user/i);
            expect(getByLabelText(/user/i)).toHaveValue(username);

            userEvent.clear(usernameInput);
            const username2 = faker.internet.userName();
            userEvent.type(usernameInput, username2)
            expect(usernameInput).toHaveValue(username2);
            expect(myStore.getState().account.username).toBe(username2);
        })

})



