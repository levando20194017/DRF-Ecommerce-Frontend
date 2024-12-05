export const Actions = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    UPDATE_USER: 'UPDATE_USER',

    GET_MAJOR: 'GET_MAJOR',
    ADD_MAJOR: 'ADD_MAJOR',
    DELETE_MAJOR: 'DELETE_MAJOR',
    EDIT_MAJOR: 'EDIT_MAJOR',

    CHANGE_INFOR: 'CHANGE_INFOR'
}

export const changeInformation = (userData: any) => {
    return {
        type: Actions.CHANGE_INFOR,
        payload: userData
    }
}