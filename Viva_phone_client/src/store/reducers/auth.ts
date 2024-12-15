import { Actions } from "../actions";

const initialState = {
    isLoggedIn: false,
    token: "",
    currentUser: {
        name: "Lê Văn Do"

    },
    major: [
        {
            id: 1,
            majorName: "IT",
        },
        {
            id: 2,
            majorName: "Marketing",
        },
        {
            id: 3,
            majorName: "Network",
        },
        {
            id: 4,
            majorName: "Accounting",
        },
    ],
    user_infor: {},
    total_unread: 0,
    total_cart: 0,
}

export const authReducer = (state = initialState, actions: any) => {
    switch (actions.type) {
        case Actions.LOGIN_USER:
            return {
                ...state,
                isLoggedIn: true
            }
        case Actions.LOGOUT_USER:
            return {
                ...initialState
            }
        case Actions.UPDATE_USER:
            return {
                ...state, currentUser: { name: actions.payload }
            }
        case Actions.CHANGE_INFOR:
            return {
                ...state, userData: actions.payload
            }
        case Actions.TOTAL_UNREAD:
            return {
                ...state, total_unread: actions.payload
            }
        case Actions.TOTAL_CART:
            return {
                ...state, total_cart: actions.payload
            }
        case Actions.GET_MAJOR:
            return {
                ...state
            }
        case Actions.ADD_MAJOR:
            const newMajor = {
                id: actions.payload.id,
                majorName: actions.payload.majorName
            };
            const addMajor = [...state.major, newMajor]
            return {
                ...state,
                major: addMajor
            };
        case Actions.DELETE_MAJOR:
            const majorId = actions.payload;
            const deleteMajor = state.major.filter((item) => item.id !== majorId);
            return {
                ...state,
                major: deleteMajor
            };
        case Actions.EDIT_MAJOR:
            const Id = actions.payload.id;
            const majorName = actions.payload.majorName;
            const updatedMajor = state.major.map((item) => {
                if (item.id === Id) {
                    return {
                        ...item,
                        majorName: majorName
                    };
                }
                return item;
            });
            return {
                ...state,
                major: updatedMajor
            };
        default: return {
            ...state
        }
    }

}