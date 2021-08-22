import * as effectTypes from "./effectTypes";

/**
 * 执行或者说启动saga的方法
 * 我们可以获取仓库状态 getState 有可能向仓库派动作dispatch, 还有可能监听动作 
 * @param {*} saga 
 */


function runSaga(env,saga) {
    let {getState, dispatch, channel} = env
    let it = saga() //执行生成器，范湖迭代器
    function next(value) {
        let  {value:effect, done} = it.next(value)
                //{type:effectTypes.TAKE, actionType}
        if (!done) {
            switch (effect.type) {
                case effectTypes.TAKE: //等待有人向仓库派发ASYNC_ADD类型的动作
                channel.take(effect.actionType,next)
                    break;
                case effectTypes.PUT: //put这个effect不会阻塞当前的saga执行，派发完成后，会立刻向下执行
                    dispatch(effect.action)
                    next()
                    break;
                default:
                    break;
            }
        }
    }
    next()
}

export default runSaga