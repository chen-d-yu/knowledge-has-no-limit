/**
 * 实现一个自定义的Promise
 * 一：初步实现promise
 *      1.1.Promise是一个类
 *      1.2.传入的executor函数立即执行
 *      1.3.状态之间不能逆转 三个状态 pending、full
 *      1.4.实现一个then函数，有两个函数参数，成功态返回data，失败态返回reason
 *      1.5.捕获executor的异常
 * 二：实现异步以及多个then
 *          使用发布订阅模式，将多个的then函数塞进订阅中心，依次执行onFulFilled或者onRejected的时候，保证是定义时的顺序执行
 *          那么订阅中心就有一个事件回调中心，只要这个中心的存放的函数，也就是then的两个参数——onFulfilled和onRejected，遍历执行
 *          那么就能成功得到数据并且响应回去
 *      2.1。处理多个then的执行顺序问题
 *      2.2.处理then执行时，pending状态遇到的异步问题
 * 三：then必须返回一个promise 解决链式调用——.then(res=>{}).then...then...的问题
 *      3.1.通过return传递结果
 *      3.2.通过新的promise传递，在这resolve结果或带有异步行为的，下一个then需要resolve接收value结果
 *      3.3.通过新的promise传递，在这次reject失败原因，那么下一个then的reject也需要接收reason结果
 *      3.4.在3.3的基础上，捕获了失败的结果，再走一个then的话，就相当于在reject中return的结果返回到下一个resolve中，下一个then的resolve接收的value = undefined
 *      3.5.如果在其中的一个then中使用抛出异常，那么下一个then的reject会接收到失败的原因reason
 *      3.6.如果then中没有onRejected，失败的结果只能走到catch，如果有且两个都有，那么只会走第一个onRejected，不走catch
 *      3.7.如果在catch之后返回内容，再继续then的成功中能获取到catch返回的value
 *
 *      catch在Promise的源码层面上也是一个then，也是遵循then的运行机制
 *
 *      结论：
 *          成功：
 *              1.then return一个普通的值
 *              2.then return一个成功态的Promise
 *          失败：
 *              1.then return一个失败态的Promise
 *              2.then 里面抛出了异常 throw new TypeError
 *          Promise链式调用：then中不具备this，不能返回this进行链式的方式
 *              1.在每个then中返回一个新的Promise
 *              2.
 *
 *
 *
 */
export default function () {
    enum Status {
        PENDING = "PENDING",
        FULFILLED = "FULFILLED",
        REJECTED = "REJECTED"
    }

    interface Executor {
        (resolve: (value?: any) => void, reject: (reason?: any) => void): void
    }

    interface Fulfilled {
        (value?: any): void
    }

    interface Rejected {
        (reason?: any): void
    }

    class CustomPromise {
        // 函数实现判断 x 是一个普通值还是 promise 类型，如果promise类型就要做特殊处理
        #resolvePromise = (promise2, x, resolve, reject) => {
            // 1.如果x===promise2，抛出一个类型错误，也就是在下面使用 p1 时，return p1 那么就类型错误
            if (promise2 === x) {
                return reject(new TypeError("类型错误"))
            }

            let called = false
            if ((typeof x === "object" && x !== null) || (typeof x === "function")) {
                // 2.如果x是一个不为空的object或者一个函数，通过校验，就得then赋值成x.then，也就是x可能是个promise，所有往x添加上then的属性
                try {
                    // 2.3如果then的过程中，有可能导致抛出异常，所以要做try catch
                    let then = x.then

                    if (typeof then === "function") {
                        // 2.1如果判断到这，就判定then返回的是promise，需要更改then的执行为当前传递进来的promise实例，且带有onFulfilled、onRejected两个参数
                        // 2.1.1如果返回的Promise中，调用了resolve、reject，只执行第一个，后面的就忽略
                        then.call(x, (y) => {
                            if (called) {
                                return
                            }

                            called = true
                            // 2.1.2这里要递归调用promise，不然嵌套return promise会出很大问题 resolve(new CustomPromise((resolve, reject)=>resolve("123"))) 这里会直接传递promise2的原型过去，所以要递归调用
                            this.#resolvePromise(promise2, y, resolve, reject)
                        }, (r) => {
                            if (called) {
                                return
                            } else {
                                called = true
                                reject(r)
                            }
                        })
                    } else {
                        // 2.2不是Promise直接resolve
                        resolve(x)
                    }
                } catch (e) {
                    if (called) {
                        return
                    }
                    called = true
                    reject(e)
                }
            } else {
                // 3.如果上面的两种类型都不满足，那么判定为一个普通值
                resolve(x)
            }
        }

        status: Status
        value?: any
        reason?: any
        // 数据回调中心
        onFulfilledCallbacks: any[]
        onRejectedCallbacks: any[]

        constructor(executor: Executor) {
            this.status = Status.PENDING
            this.onFulfilledCallbacks = []
            this.onRejectedCallbacks = []

            const resolve = (value) => {
                if (this.status === Status.PENDING) {
                    this.status = Status.FULFILLED
                    this.value = value

                    // 如果在then中发生了异步操作的话，无论如何都会执行resolve，那么之前做的发布操作存放的函数放在数据中心中，就派上用场了
                    // 只需要在resolve执行时，内部将数据回调中心的函数依次执行即可
                    this.onFulfilledCallbacks.forEach(fn => fn())
                }
            }
            const reject = (reason) => {
                if (this.status === Status.PENDING) {
                    this.status = Status.REJECTED
                    this.reason = reason
                }

                // 跟resolve同理
                this.onRejectedCallbacks.forEach(fn => fn())
            }

            try {
                executor(resolve, reject)
            } catch (err) {
                reject(err)
            }
        }


        then(onFulfilled?: Fulfilled, onRejected?: Rejected) {
            // 3.onFulfilled、onRejected这两个东西存不存在，不存在的话，能进行then穿透  then().then().then()....
            onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
            onRejected = typeof onRejected === "function" ? onRejected : reason => {
                throw reason
            }


            let promise2 = new CustomPromise((resolve, reject) => {
                // 需要判断resolve的是一个普通值或者是promise值
                if (this.status === Status.FULFILLED) {
                    // setTimeout这个一步是因为要把CustomPromise的then->onFulfilled、onRejected搞成微任务或者是宏任务
                    setTimeout(() => {
                        // try catch是为了在链式调用then的时候，抛出异常都由Rejected捕获错误
                        try {
                            let x = onFulfilled(this.value)
                            this.#resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                }

                if (this.status === Status.REJECTED) {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            this.#resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                }

                if (this.status === Status.PENDING) {
                    // 发布操作，如果在then发生了异步操作，resolve的话，那么就需要数据中心，执行订阅操作
                    // pending状态默认不需要setTimeout异步，因为pending就是异步的了
                    this.onFulfilledCallbacks.push(() => {
                        try {
                            let x = onFulfilled(this.value)
                            this.#resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })

                    this.onRejectedCallbacks.push(() => {
                        try {
                            let x = onRejected(this.reason)
                            this.#resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                }
            })

            return promise2
        }

        // 4.添加上catch，catch也就是另外一种形式的then，用来捕获错误或者onRejected出去的东西
        catch(errorCallback) {
            return this.then(null, errorCallback)
        }
    }



    const promise = new CustomPromise((resolve, reject) => {
        /**
         * 如果这三个状态都存在的话，只会执行最新顺序的那个函数参数，就算是Error也不例外，原生的Promise也是这么写的
         */
        resolve("正确的")
        // reject("错误的")
        // throw new Error("一阵见血的")
    })

    const p1 = promise.then((value) => {
        return new CustomPromise((resolve, reject) => {
            setTimeout(() => {
                // resolve("123")
                reject("错误的")
            }, 2000)
        })
    }, (reason) => {
        return reason
    })

    p1.then((value) => {
        console.log("value -->", value)
    }).catch(e=>{
        console.log(e)
    })



}

