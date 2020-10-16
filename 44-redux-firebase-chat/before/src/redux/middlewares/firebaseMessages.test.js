import React from 'react';
import mockFirebaseMessages from "./firebaseMessages";

jest.mock("./firebaseMessages");

const create = (thunk) => {
    console.log(thunk)
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
    }
    const next = jest.fn()

    const invoke = action => thunk(store)(next)(action)

    return { store, next, invoke }
}

it("non-function action NOT_FIREBASE_INIT", () => {
    const { next, invoke } = create(mockFirebaseMessages)
    const action = { type: 'NOT_FIREBASE_INIT' }
    invoke(action)
    expect(next).toHaveBeenCalledWith(action);
})

it("non-function action FIREBASE_INIT", () => {
    const { next, invoke } = create(mockFirebaseMessages)
    const action2 = { type: 'FIREBASE_INIT' }
    invoke(action2)
    expect(next).toHaveBeenCalledTimes(0);
})