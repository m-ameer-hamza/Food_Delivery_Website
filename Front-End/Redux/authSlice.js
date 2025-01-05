const initialAuthState = {
  isAuthenticated: false,
};

//Action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    // case LOGOUT:
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //   };

    default:
      return state;
  }
};

//Action dispatchers
export const login = () => {
  return {
    type: LOGIN,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
