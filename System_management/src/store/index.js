import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { loginSuccess } from "./actions/authAction";
const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
const savedIsLoggedIn = localStorage.getItem("isLoggedIn");

// Nếu trạng thái đã lưu là true, dispatch action để cập nhật trạng thái xác thực
if (savedIsLoggedIn === "true") {
  store.dispatch(loginSuccess());
}

export default store;
