import React from "react"
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {render as rtlRender} from "@testing-library/react"
import reducer from '../reducers/index';
import mockFirebaseMessages from "../middlewares/firebaseMessages";

jest.mock("../middlewares/firebaseMessages");

/**
// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
// @author: Kent C. Dodds
 */
export default function render(
    ui,
    {
        initialState,
        store = createStore(reducer, initialState, applyMiddleware(mockFirebaseMessages)),
        ...renderOptions
    } = {},
) {
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
    }
    return {
        ...rtlRender(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}
