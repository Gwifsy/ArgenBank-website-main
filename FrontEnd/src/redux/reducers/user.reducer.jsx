import { GET_USERPROFILE, EDIT_USERNAME } from "../actions/type.actions"

const initialState = {
    status: 'VOID',
    userData: {}
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERPROFILE:
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload
            }
        case EDIT_USERNAME:
            return {
                ...state,
                status: "MODIFIED",
                userData: {
                    ...state.userData,
                    username: action.payload
                }
            }

        default:
            return state;
    }
}
