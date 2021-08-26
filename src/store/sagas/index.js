import * as types from "../action-types";
import { take, put, takeEvery } from "../../redux-saga/effects";
import watcher_add from "./counter";


function*  rootSaga() {
    yield watcher_add()
}

export default rootSaga