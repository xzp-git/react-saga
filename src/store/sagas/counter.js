import * as types from "../action-types";
import { take, put, takeEvery, call, cps } from "../../redux-saga/effects";

 

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve,ms)
    })
}

function delay2(ms,callback) {
    setTimeout(() =>{
        callback(null,ms)
        console.log(ms,'huidiao');
    },ms)
}

function* worker_add() {
    yield cps(delay2,1000)

    yield put({type:types.ADD})
}


// function*  rootSaga(params) {
//     for(let i = 0; i<3; i++){
//         yield take(types.ASYNC_ADD) //等待有人向仓库派发一个 ASYNC_ADD这样的命令，等到了就继续执行，等不到就卡在这里
//         //向仓库派发一个动作，让仓库调用store.dispatch({type:types.ADD})
//         yield add()
//     }  
// }

function* watcher_add() {

    yield takeEvery(types.ASYNC_ADD,worker_add)

}

export default watcher_add