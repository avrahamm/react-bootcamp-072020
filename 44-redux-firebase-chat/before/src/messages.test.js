import React from 'react';
// import "regenerator-runtime/runtime.js";
import {createStore} from 'redux'
import {Provider} from 'react-redux';

import {screen, render, wait} from '@testing-library/react'
import Messages from './messages.js'
import reducer from './redux/reducers/index';
import store from './redux/store';

// jest.mock('./redux/store');

describe('Messages component', () => {
    it.skip('should have "Messages" label in the dom',
        () => {
            // console.log(store.getState());
            const {container, getByText} = render(
                <Provider store={store}>
                    <Messages/>
                </Provider>
            );
            expect(getByText(/messages/i))
                .toBeInTheDocument();

        })
})


test('assure number of messages in the dom',
    async () => {

        const messagesCount = 1; //initialState.messages.messages.length;
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
            getByText, getAllByRole,
            queryAllByRole,
            findByText, findAllByRole
        } = render(
            <Provider store={myStore}>
                <Messages/>
            </Provider>
        );

        const messagesByRole = await findAllByRole("message-item");
        expect(messagesByRole).toHaveLength(2);
        const messageByText = await findByText(/ha1/i);
        expect(messageByText).toBeInTheDocument();
    })

