import {createSelector} from "reselect";

const activeRoomIdSelector = state => state.rooms.activeRoomId;
const activeRoomIdByPropsSelector = (_, props) => props.activeRoomId;
const roomsSelector = state => state.rooms.rooms;
const activeRoomSelector = createSelector(
    [activeRoomIdByPropsSelector, roomsSelector],
    (activeRoomId, rooms) =>
        rooms.find((room) => room.id === activeRoomId)
);

const curUserIdSelector = ( state => state.users.curUserId );
const usersSelector = state => state.users.users;
const curUserSelector = createSelector(
    [curUserIdSelector, usersSelector],
    (curUserId, users ) => users.find((user) => user.id === curUserId)
)

const messagesSelector = state => state.messages.messages;

const curRoomMessagesSelector = createSelector(
    [activeRoomIdByPropsSelector, messagesSelector],
    (activeRoomId, messages) =>
        messages.filter( message => message.roomId === activeRoomId)
);

const curRoomMessagesCountSelector = createSelector(
    [activeRoomIdByPropsSelector, messagesSelector],
    (activeRoomId, messages) =>
        messages.filter( message => message.roomId === activeRoomId).length
);

const userIdToNameMapSelector = state => state.users.userIdToNameMap;

const curRoomFilledMessagesSelector = createSelector(
    [activeRoomSelector, curUserSelector, userIdToNameMapSelector, curRoomMessagesSelector],
    ( activeRoom, curUser, userIdToNameMap, curRoomMessages )  => {
        const curRoomFilledMessages = curRoomMessages
            .filter( message => message.roomId === activeRoom.id)
            .map( message => {
                    return {...message, username: userIdToNameMap.get(message.userId) }
                }
            );

        return {activeRoom, curUser, curRoomFilledMessages }
    }
);

const usersSearchPatternSelector = state => state.users.searchPattern.toLowerCase();

const userItemsSelector = createSelector(
    [ activeRoomIdSelector, usersSearchPatternSelector, usersSelector ],
    ( activeRoomId, usersSearchPattern, users ) =>
        users.filter(
            userItem =>
                userItem.roomId === activeRoomId &&
                userItem.name.toLowerCase().includes( usersSearchPattern ) )
);

const roomsSearchPatternSelector = state => state.rooms.searchPattern.toLowerCase();

const roomItemsSelector = createSelector(
    [ activeRoomIdSelector, roomsSearchPatternSelector, roomsSelector],
    ( activeRoomId, roomsSearchPattern, rooms ) =>
        rooms.filter(
            roomItem => roomItem.name.toLowerCase().includes(roomsSearchPattern) )
)

export {
    curRoomFilledMessagesSelector,
    userItemsSelector,
    roomItemsSelector
};