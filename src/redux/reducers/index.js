const initialState = {
  place: "",
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE":
      return { ...state, place: action.payload };
    default:
      return state;
  }
};

export default mainReducer;
