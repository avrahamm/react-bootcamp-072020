import produce from 'immer';
import {nextId} from './utils';

const initialState = {
    messages: [
        {
            id: 0,
            userId: 1,
            username: "user1",
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
            text: "Hello?",
            time: "9:47 AM, Today"
        },
        {
            id: 1,
            userId: 1,
            username: "user1",
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
            text: "Hi, how are you samim?",
            time: "10:40 AM, Today"
        },
        {
            id: 2,
            userId: 2,
            username: "user2",
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ?",
            time: "8:40 AM, Today"
        },
        {
            id: 3,
            userId: 3,
            username: "user3",
            roomId: 0,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "blinnnnnnn ?",
            time: "3:43 AM, Today"
        },
        {
            id: 4,
            userId: 4,
            username: "user4",
            roomId: 1,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "Nuuuuuuuuuu ?",
            time: "4:43 AM, Today"
        },
        {
            id: 5,
            userId: 2,
            username: "user2",
            roomId: 1,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "Hi Dear friend !!! ?",
            time: "2:43 AM, Today"
        },
        {
            id: 6,
            userId: 3,
            username: "user3",
            roomId: 1,
            imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
            text: "Adios, OHOHOHOHOHOOHOH !!! ?",
            time: "1:43 AM, Today"
        },
    ]
};


export default produce((state, action) => {
    switch (action.type) {
        case 'RECEIVED_MESSAGE':
            // state.messages.push(action.payload);
            state.messages.push({
                id: nextId(state.messages),
                from: action.payload.from,
                text: action.payload.text,
            });
            break;

        case 'SET_USERNAME':
            state.messages.push({
                id: nextId(state.messages),
                from: 'SYSTEM',
                text: `A user has changed its name to: ${action.payload}`
            });
            break;
    }
}, initialState);


