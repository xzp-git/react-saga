import * as effectTypes from "./effectTypes";
import { TASK_CANCEL } from "./symbol";
/**
 * 执行或者说启动saga的方法
 * 我们可以获取仓库状态 getState 有可能向仓库派动作dispatch, 还有可能监听动作 
 * @param {*} saga 
 */


function runSaga(env,saga,doneCallback) {
    let task = {cancel:() => next(TASK_CANCEL)}
    let subTasks = []

    let {getState, dispatch, channel} = env
    let it = typeof saga === 'function'? saga() : saga //执行生成器，范湖迭代器
    function next(value,isError) {

        let result

        if(isError){
            result = it.throw(value)
        }else if(value === TASK_CANCEL){
            subTasks.forEach(subTask => subTask.cancel())
            // 如果给next传入了TASK_CANCEL，说明我们要取消任务
            result = it.return(value)
        }else{
            result = it.next(value)
        }

        let  {value:effect, done} = result
                //{type:effectTypes.TAKE, actionType}
        if (!done) {
            if (typeof effect[Symbol.iterator] === 'function') {
                runSaga(env,effect)
                next()
            }else if(typeof effect.then === 'function'){
                effect.then(next)
            }else{
                switch (effect.type) {
                    case effectTypes.TAKE: //等待有人向仓库派发ASYNC_ADD类型的动作
                    channel.take(effect.actionType,next)
                        break;
                    case effectTypes.PUT: //put这个effect不会阻塞当前的saga执行，派发完成后，会立刻向下执行
                        dispatch(effect.action)
                        next()
                        break;
                    case effectTypes.FORK: //开启一个新的子进程 不会阻塞当前的saga
                        const fortask = runSaga(env, effect.saga)
                        subTasks.push(fortask)
                        next(fortask)
                        break;
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next)
                        break
                    case effectTypes.CPS:
                        effect.fn(...effect.args,(err,data)=>{
                            if (err) {
                                next(err,true)
                            }else{
                                next(data)
                            }
                        })
                        break
                    case effectTypes.ALL:
                        let effects = effect.effects
                        let result = []
                        let completedCount = 0
                        effects.forEach((effect,index) => {
                           let subTask = runSaga(env,effect,(res) => {
                                result[index] = res
                                if (++completedCount === effects.length){
                                    next(result)
                                }
                            })
                            subTasks.push(subTask)
                        });
                        break
                    case effectTypes.CANCEL:
                        effect.task.cancel() //调用这个task的cancel方法
                        next()
                        break
                default:
                        break;
                }
            }
            
        }else{

            // done为true 说明整个saga 结束
            doneCallback && doneCallback(effect)
        }
    }
    next()
    return task
}

export default runSaga