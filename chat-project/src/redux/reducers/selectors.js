import {createSelector, defaultMemoize, createSelectorCreator} from "reselect";
import isEqual from 'lodash.isEqual';

const activeRoomIdSelector = state => state.rooms.activeRoomId;
const activeRoomIdByPropsSelector = (_, props) => props.activeRoomId;
const roomsSelector = state => state.rooms.rooms;
const activeRoomByPropsSelector = createSelector(
    [activeRoomIdByPropsSelector, roomsSelector],
    (activeRoomId, rooms) =>
        rooms.find((room) => room.id === activeRoomId)
);

const curUserIdSelector = ( state => state.users.curUserId );
const usersSelector = state => {
    return state.users.users
};
const curUserSelector = createSelector(
    [curUserIdSelector, usersSelector],
    (curUserId, users ) => users.find(
        (user) => {
            return user.id === curUserId
        })
)

const messagesSelector = state => state.messages.messages;

const curRoomMessagesSelector = createSelector(
    [activeRoomIdByPropsSelector, messagesSelector],
    (activeRoomId, messages) =>
        messages.filter( message => message.roomId === activeRoomId)
);

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

const userIdToUserDataSelector = state => state.users.userIdToUserData;
const userIdToUserMessagesDataSelector = createDeepEqualSelector(
    [ userIdToUserDataSelector],
    ( userIdToUserData) => {
        const userIdToUserMessagesData = {};
        for (const [userId, user] of Object.entries(userIdToUserData)) {
            const {name, imgUrl} = user;
            userIdToUserMessagesData[userId] = {name, imgUrl};
        }
        return userIdToUserMessagesData;
    }
);

const curRoomFilledMessagesSelector = createDeepEqualSelector(
    [activeRoomByPropsSelector, curUserSelector, userIdToUserMessagesDataSelector, curRoomMessagesSelector],
    ( activeRoom, curUser, userIdToUserMessagesData, curRoomMessages )  => {
        const curRoomFilledMessages = curRoomMessages
            .filter( message => message.roomId === activeRoom.id)
            .map( message => {
                    return {...message,
                        username: userIdToUserMessagesData[message.userId].name,
                        imgUrl: userIdToUserMessagesData[message.userId].imgUrl,
                    }
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
                activeRoomId &&
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