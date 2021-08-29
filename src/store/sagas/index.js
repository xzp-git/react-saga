import * as types from "../action-types";
import { take, put, takeEvery, all, fork,delay, cancel } from "../../redux-saga/effects";
import watcher_add from "./counter";


// function*  rootSaga() {
//     yield watcher_add()
// }


// function* add1() {
//     for(let i = 0; i<3; i++){
//         yield take(types.ASYNC_ADD)
//         yield put({type:types.ADD})
//     }
//     return 'add1'
// }
// function* add2() {
//     for(let i = 0; i<3; i++){
//         yield take(types.ASYNC_ADD)
//         yield put({type:types.ADD})
//     }
//     return 'add2'
// }

// function delay(ms) {
//     return new Promise(resolve => {
//         setTimeout(resolve,ms)
//     })
// }

function* add() {
    while (true) {
        yield delay(100)
        yield put({type:types.ADD})
    }
}
function * addWatcher() {
    const task = yield fork(add)
    yield take(types.STOP_ADD)
    yield cancel(task)
}

function*  rootSaga() {
//    let result = yield  all([add1(), add2()])
//    console.log('done',result)
    yield addWatcher()
} 

export default rootSaga