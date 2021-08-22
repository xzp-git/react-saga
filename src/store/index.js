import { createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";




let sagaMiddleware = createSagaMiddleware()

let store = applyMiddleware(sagaMiddleware)(createStore)(rootReducer)

// 启动一个saga执行
sagaMiddleware.run(rootSaga)
export default store