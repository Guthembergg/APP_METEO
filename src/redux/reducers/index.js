const initialState = {
  place: "new york",
  location: {},
  lon: -74.0060152,
  lat: 40.7127281,
  weather: null,
  weatherDaily: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE":
      return { ...state, place: action.payload };
    case "LOCATION_LAT":
      return { ...state, lat: action.payload };
    case "LOCATION_LON":
      return { ...state, lon: action.payload };
    case "WEATHER":
      return { ...state, weather: action.payload };
    case "WEATHERDAILY":
      return { ...state, weatherDaily: action.payload };
    default:
      return state;
  }
};

export default mainReducer;
