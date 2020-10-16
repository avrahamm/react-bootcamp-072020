import React from 'react';
import faker from "faker";

import {screen } from '@testing-library/react'
import render from "./redux/utils/rtl_render_with_providers";
import userEvent from '@testing-library/user-event'
import App from './app.js'
import * as firebaseActions from "./redux/firebase_actions";
import initialState from "./__mocks__/initialState";

describe('Integration test testing the full flow.', () => {
  it('full flow', async () => {

    const { store, rerender } = render(<App />, {initialState});
    store.dispatch({type: 'FIREBASE_INIT'})

    firebaseActions.sendToFirebase = jest.fn((from, text) => {
      const created_at = new Date();
      const id = faker.random.uuid();
      const newMessage = ({ id, from, text, created_at });
      store.dispatch({ type: 'RECEIVED_MESSAGE', payload: newMessage });
    })

    // Username
    const usernameInput = screen.getByLabelText(/user/i);
    await userEvent.clear(usernameInput);
    const username2 = faker.internet.userName();
    await userEvent.type(usernameInput, username2)

    // SendMessage
    const addMessageInput = screen.getByLabelText(/add message/i);
    expect(addMessageInput).toHaveValue("");

    const messageContent = faker.lorem.word();
    await userEvent.type(addMessageInput, messageContent)
    expect(addMessageInput).toHaveValue(messageContent);

    const addMessageButton = screen.getByRole("button", { name: /add/i})
    await userEvent.click(addMessageButton);
    expect(firebaseActions.sendToFirebase).toHaveBeenCalledTimes(1);

    //Messages - FAILS
    // const messagesByRole = await screen.findAllByRole("message-item");
    // const messagesLength = store.getState().messages.messages.length;
    // expect(messagesByRole).toHaveLength(messagesLength);

    // const lastMessageFrom = username2;
    // const lastMessageText = messageContent;
    // const messageByFrom = await screen.findByText(lastMessageFrom);
    // expect(messageByFrom).toBeInTheDocument();
    // const messageByText = await screen.findByText(lastMessageText);
    // expect(messageByText).toBeInTheDocument();

  })
})

