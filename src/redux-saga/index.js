
import runSaga from "./runSaga";
import createChannel from "./createChannel";

function createSagaMiddleware() {
    let channel = createChannel() //{take,put}
    let boundRunSaga
     function sagaMiddleware({getState,dispatch}) {
        boundRunSaga = runSaga.bind(null,{getState,dispatch,channel})
        return function (next) { //下一个中间件的dispatch方法
            return function (action) { //自己的dispatch方法
                
                let result = next(action)
                channel.put(action)
                return result
            }
        }
    }
    sagaMiddleware.run = (saga) => boundRunSaga(saga)
    return sagaMiddleware
}


export default createSagaMiddleware