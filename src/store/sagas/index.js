import * as types from "../action-types";
import { take, put, takeEvery } from "../../redux-saga/effects";



function* worker_add() {
    yield put({type:types.ADD})
}

function* watcher_add() {
    yield takeEvery(types.ASYNC_ADD, worker_add)
}
// function*  rootSaga(params) {
//     for(let i = 0; i<3; i++){
//         yield take(types.ASYNC_ADD) //等待有人向仓库派发一个 ASYNC_ADD这样的命令，等到了就继续执行，等不到就卡在这里
//         //向仓库派发一个动作，让仓库调用store.dispatch({type:types.ADD})
//         yield add()
//     }  
// }


function*  rootSaga() {
    yield watcher_add()
}

export default rootSaga