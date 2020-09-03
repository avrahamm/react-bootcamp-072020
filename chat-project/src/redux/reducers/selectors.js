import {createSelector, defaultMemoize, createSelectorCreator} from "reselect";

const activeRoomIdSelector = state => state.rooms.activeRoomId;
const activeRoomIdByPropsSelector = (_, props) => props.activeRoomId;
const roomsSelector = state => state.rooms.rooms;
const activeRoomByPropsSelector = createSelector(
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

const isEqualish = function (v1, v2) {
    console.log("==isEqualish", v1, "###", v2);
    if (v1 === v2) {
        return true;
    }

    if (Array.isArray(v1) && Array.isArray(v2)) {
        if (v1.length !== v2.length) {
            return false;
        }

        return v1.every(function (v, ix) {
            return v2[ix] === v;
        });
    }

    return false;
};

const createEqualishSelector = createSelectorCreator(
    defaultMemoize,
    isEqualish
);

const curRoomFilledMessagesSelector = createSelector(
    [activeRoomByPropsSelector, curUserSelector, userIdToNameMapSelector, curRoomMessagesSelector],
    ( activeRoom, curUser, userIdToNameMap, curRoomMessages )  => {
        const curRoomFilledMessages = curRoomMessages
            .filter( message => message.roomId === activeRoom.id)
            .map( message => {
                    return {...message, username: userIdToNameMap.get(message.userId) }
                }
            );

        return curRoomFilledMessages;
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
    activeRoomByPropsSelector,
    curUserSelector,
    curRoomFilledMessagesSelector,
    userItemsSelector,
    roomItemsSelector
};