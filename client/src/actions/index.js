import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const SEARCH_FAIL = "SEARCH_FAIL";

// Conectamos el back con el front
export function getDogs(name) {
  return async (dispatch) => {
    var json = await axios.get("http://localhost:3001/dogs", {});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}
