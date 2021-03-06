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

export function call(fn,...args) {
    return {type:effectTypes.CALL, fn, args}
}

export function cps(fn,...args) {
    return {type:effectTypes.CPS, fn, args}
}

export function select(selctor) {
    return {type:effectTypes.SELECT,selctor}
}

export function all(effects) {
    return {type:effectTypes.ALL,  effects}
}

export function cancel(task) {
    return {type:effectTypes.CANCEL,  task}
}

function delayP(ms, value = true) {
    const promise = new Promise(resolve => {
        setTimeout(resolve,ms,value)
    })
    return promise
}

export const delay = call.bind(null,delayP)