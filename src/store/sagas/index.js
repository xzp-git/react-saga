import * as types from "../action-types";
import { take, put, takeEvery, all } from "../../redux-saga/effects";
import watcher_add from "./counter";


// function*  rootSaga() {
//     yield watcher_add()
// }


function* add1() {
    for(let i = 0; i<3; i++){
        yield take(types.ASYNC_ADD)
        yield put({type:types.ADD})
    }
    return 'add1'
}
function* add2() {
    for(let i = 0; i<3; i++){
        yield take(types.ASYNC_ADD)
        yield put({type:types.ADD})
    }
    return 'add2'
}

function*  rootSaga() {
   let result = yield  all([add1(), add2()])
   console.log('done',result)
} 

export default rootSaga