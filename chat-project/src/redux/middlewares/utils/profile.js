import * as actionTypes from "../../consts/action-types";
import * as actions from "../../actions";
import {defaultNoPicImage} from "../../../../firebase";

/**
 * To avoid code repetition in profile middleware.
 * @param action
 * @returns {{userData: {country: *, updatedTime: *, displayName: *}, authUserData: {displayName: *}, errorAction: (function(*): {payload: {errorMessage: *}, type: string}), messageData: {displayName: *}}|{userData: {photoUrl: string}, authUserData: {photoURL: string}, errorAction: (function(*): {payload: {errorMessage: *}, type: string}), messageData: {photoUrl: string}}|{}}
 */
export const getUpdateProfileData = (action) => {
    switch(action.type) {

        case actionTypes.UPDATE_PROFILE_FIELDS: {
            const {displayName, country, updatedTime,} = action.payload;
            const authUserData = {
                displayName,
            }
            const userData = {
                displayName,
                country,
                updatedTime,
            };
            const messageData = {
                displayName,
            }
            const errorAction = actions.updateProfileFieldsError;

            return {
                authUserData,
                userData,
                messageData,
                errorAction,
            }
        }

        case actionTypes.REMOVE_PROFILE_PICTURE: {
            const authUserData = {
                photoURL: defaultNoPicImage,
            }
            const userData = {
                photoUrl: defaultNoPicImage,
            };
            const messageData = {
                photoUrl: defaultNoPicImage,
            };
            const errorAction = actions.updateProfilePictureError;

            return {
                authUserData,
                userData,
                messageData,
                errorAction,
            }
        }

        default: {
            return {};
        }
    }
}