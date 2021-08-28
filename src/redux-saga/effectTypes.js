
//监听特定的动作
export const TAKE = 'TAKE'
//向仓库派发动作
export const PUT = 'PUT'

// 开启一个新的子进程，一般不会阻塞当前的进程
export const FORK = 'FORK'


// 调用一个函数 默认次函数需要返回一个promise
export const CALL = 'CALL'

// 调用一个函数，此函数的最后一个参数应该是一个callback 调用callback
export const CPS = 'CPS'

export const ALL = 'ALL'