import * as effectTypes from "./effectTypes";


export function take(actionType) {
    return {type:effectTypes.TAKE, actionType}
}

export function put(action) {
    return {type:effectTypes.PUT, action}
}
/**
 * 
 * @param {*} sag 以新的子进程的方式执行saga
 * @returns 
 */
export function fork(saga) {
    return {type:effectTypes.FORK, saga}
}

/**
 * 等待每一次的actionType派发，然后以单独的子进程去调用saga
 * @param {*} actionType 
 * @param {*} saga 
 * @returns 
 */

export function takeEvery(actionType, saga) {
    function * takeEveryHelper() {
        while (true) {
            yield take(actionType) 
            yield fork(saga)
        }
    }

    return fork(takeEveryHelper)
}