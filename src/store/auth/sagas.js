import { put, call, takeLatest } from "redux-saga/effects";
import {
  login,
  logout,
  register,
  getActiveUser,
  setActiveUser,
  setToken,
} from "./slice";
import authService from "../../services/AuthService";

function* handleRegister(action) {
  try {
    const data = yield call(authService.register, action.payload);
    yield put(setToken(data.authorization.token));
    yield put(setActiveUser(data.user));
  } catch (error) {
    alert("registration failed");
  }
}

function* handleLogin(action) {
  try {
    const data = yield call(authService.login, action.payload);
    yield put(setToken(data.authorization.token));
    yield put(setActiveUser(data.user));
  } catch (error) {
    alert("password must contain at least one number and 8 or more characters");
  }
}

function* handleLogout() {
  try {
    yield call(authService.logout);
    yield put(setToken(null));
    yield put(setActiveUser(null));
  } catch (error) {
    yield put(setToken(null));
    yield put(setActiveUser(null));
    alert("Can`t logout as a guest");
  }
}

function* handleGetActiveUser() {
  try {
    const activeUser = yield call(authService.getActiveUser);
    yield put(setActiveUser(activeUser));
  } catch (error) {
    yield put(setToken(null));
    yield put(setActiveUser(null));
    console.log("log in again expired");
  }
}

export function* watchLogin() {
  yield takeLatest(login.type, handleLogin);
}

export function* watchLogout() {
  yield takeLatest(logout.type, handleLogout);
}

export function* watchRegister() {
  yield takeLatest(register.type, handleRegister);
}

export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, handleGetActiveUser);
}
