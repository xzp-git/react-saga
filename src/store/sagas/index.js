import * as types from "../action-types";
import { take, put } from "../../redux-saga/effects";






function*  rootSaga(params) {
    for(let i = 0; i<3; i++){
        yield take(types.ASYNC_ADD) //等待有人向仓库派发一个 ASYNC_ADD这样的命令，等到了就继续执行，等不到就卡在这里
        //向仓库派发一个动作，让仓库调用store.dispatch({type:types.ADD})
        yield put({type:types.ADD})
    }  
}

export default rootSaga