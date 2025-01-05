const initialUserState = {
  name: "",
  email: "",
  img: "",
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        img: action.payload.img,
      };
    // case "CLEAR_USER":
    //   return {
    //     ...state,
    //     name: "",
    //     email: "",
    //     img: "",
    //   };
    default:
      return state;
  }
};

export const saveUser = (user) => {
  return {
    type: "SAVE_USER",
    payload: user,
  };
};
export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  };
};
