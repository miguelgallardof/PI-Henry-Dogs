import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
