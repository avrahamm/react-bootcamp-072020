import produce from 'immer';

import * as actions from "../consts/action-types";
import dateFormat from "dateformat";
import {nextId} from './utils';

const initialState = {
    messages: [
        {
            id: 0,
            userId: 1,
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
            text: "Hello?",
            time: "01/28/2020, 21:19:39"
        },
        {
            id: 1,
            userId: 1,
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
            text: "Hi, how are you samim?",
            time: "05/08/2020, 21:19:39"
        },
        {
            id: 2,
            userId: 2,
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ?",
            time: "10/17/2020, 21:19:39"
        },
        {
            id: 3,
            userId: 3,
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "blinnnnnnn ?",
            time: "05/11/2020, 21:19:39"
        },
        {
            id: 4,
            userId: 4,
            roomId: 1,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "Nuuuuuuuuuu ?",
            time: "02/21/2020, 21:19:39"
        },
        {
            id: 5,
            userId: 2,
            roomId: 1,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "Hi Dear friend !!! ?",
            time: "03/08/2020, 21:19:39"
        },
        {
            id: 6,
            userId: 3,
            roomId: 1,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "Adios, OHOHOHOHOHOOHOH !!! ?",
            time: "03/22/2020, 21:19:39"
        },
    ]
};


export default produce((state, action) => {
    switch (action.type) {
        case actions.RECEIVED_MESSAGE:
            state.messages.push({
                id: nextId(state.messages),
                userId: action.payload.userId,
                roomId: action.payload.roomId,
                imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
                text: action.payload.text,
                time: action.payload.time,
            });
            break;

        case actions.SET_USERNAME:
            const now = new Date();
            const sentTime = dateFormat(now, "mm/dd/yyyy, HH:MM:ss");
            state.messages.push({
                id: nextId(state.messages),
                userId: action.payload.userId, // TODO! SYSTEM user id
                roomId: action.payload.roomId, // null
                //Todo! System image
                imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
                text: `A user has changed its name to: ${action.payload}`,
                time: sentTime,
            });
            break;
    }
}, initialState);
