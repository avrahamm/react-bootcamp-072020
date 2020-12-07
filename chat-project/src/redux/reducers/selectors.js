import {createSelector, defaultMemoize, createSelectorCreator} from "reselect";
import isEqual from 'lodash.isEqual';

const activeRoomIdSelector = state => state.rooms.activeRoomId;
const activeRoomIdByPropsSelector = (_, props) => props.activeRoom.id;
const roomsSelector = state => state.rooms.rooms;
const activeRoomByPropsSelector = createSelector(
    [activeRoomIdByPropsSelector, roomsSelector],
    (activeRoomId, rooms) =>
        rooms.find((room) => room.id === activeRoomId)
);

const curUserIdSelector = ( state => state.authUser.curUserId );
const usersSelector = state => {
    return state.activeRoomUsers.users
};
const curUserSelector = ( state => state.authUser.currentUser );

const messagesSelector = state => state.activeRoomMessages.messages;

const curRoomMessagesSelector = createSelector(
    [activeRoomIdByPropsSelector, messagesSelector],
    (activeRoomId, messages) =>
        messages.filter( message => message.roomId === activeRoomId)
);

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

const userIdToUserDataSelector = state => state.activeRoomUsers.userIdToUserData;
const userIdToUserMessagesDataSelector = createDeepEqualSelector(
    [ userIdToUserDataSelector],
    ( userIdToUserData) => {
        const userIdToUserMessagesData = {};
        for (const [userId, user] of Object.entries(userIdToUserData)) {
            const {displayName, photoUrl} = user;
            userIdToUserMessagesData[userId] = {displayName, photoUrl};
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
                        username: userIdToUserMessagesData[message.userId].displayName,
                        photoUrl: userIdToUserMessagesData[message.userId].photoUrl,
                    }
                }
            );

        return curRoomFilledMessages;
    }
);

const usersSearchPatternSelector = state => state.activeRoomUsers.searchPattern.toLowerCase();

const userItemsSelector = createSelector(
    [ activeRoomIdSelector, usersSearchPatternSelector, usersSelector ],
    ( activeRoomId, usersSearchPattern, users ) =>
        users.filter(
            userItem =>
                activeRoomId &&
                userItem.roomId === activeRoomId &&
                userItem.displayName.toLowerCase().includes( usersSearchPattern ) )
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