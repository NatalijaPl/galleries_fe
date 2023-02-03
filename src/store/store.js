import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import galleries from "./galleries/slice";
import auth from "./auth/slice";
import sagas from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth,
    galleries,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
export default store;
