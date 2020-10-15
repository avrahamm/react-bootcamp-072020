import faker from "faker";

const username = faker.internet.userName();
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

export default initialState;
export {username};