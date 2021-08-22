



function createChannel() {
    let currentTakers = [] //当前的监听着
    /**
     * 
     * @param {*} actionType 动作类型 ASYNC_ADD
     * @param {*} taker 
     */
    function take(actionType,taker) {
        taker.actionType = actionType

        //调用cancel方法可以把自己从数组中干掉
        taker.cancel = () => {
            currentTakers = currentTakers.filter(item => item!==taker)
        }
        currentTakers.push(taker)
    }
    /**
     * 触发takers数组中的函数执行，但是要配置动作类型
     * @param {*} action 动作
     */
    function put(action) {
        currentTakers.forEach(taker => {
            if (taker.actionType === action.type) {
                taker.cancel()
                taker(action)
            }
        })
    }

    return {take, put}
}

export default createChannel