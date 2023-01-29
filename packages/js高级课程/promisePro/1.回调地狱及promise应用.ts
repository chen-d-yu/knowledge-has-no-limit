export default  function  (){
// 回调地狱和promise应用
// 1.回调地狱的产生
// 过多的异步请求，下一个异步请求依赖上一个异步请求的结果，过多请求的回调会嵌套，维护代码、捕捉错误很不方便，
    const arr =[]
// $.get('http://localhost:8090',(data,status)=>{
//     $.get(`http://localhost:8090/${data}`,(data1,status1)=>{
//         $.get(`http://localhost:8090/${data1}`,(data2,status2)=>{
//             $.get(`http://localhost:8090/${data2}`,(data3,status3)=>{
//                 $.get(`http://localhost:8090/${data3}`,(data4,status4)=>{
//                     $.get(`http://localhost:8090/${data4}`,(data5,status5)=>{
//                         arr.push(data5)
//                     })
//                 })
//             })
//         })
//     })
// })
// 2.promise解决回调地狱
// axios.get('http://localhost:8090').then(res=>{
//     axios.get(`http://localhost:8090/${res}`).then(res1=>{
//         axios.get(`http://localhost:8090/${res1}`).then(res2=>{
//             axios.get(`http://localhost:8090/${res2}`).then(res3=>{
//                 arr.push((res3))
//             })
//         })
//     })
// })
// 使用async await语法糖，强行拉直回调函数
// async function callFun(){
//     const res1 = await  axios.get('http://localhost:8090')
//     const res2 = await   axios.get(`http://localhost:8090/${res1}`)
//     const res3 = await   axios.get(`http://localhost:8090/${res2}`)
//     arr.push(res3)
// }
// callFun()

    /*
    1.promise是解决异步流程化的一种手段，比如避免回调地狱
    2.promise是一个构造函数，是需要new
    3.promise有且只有一个参数executor执行器，执行器有两个参数 -> resolve成功态调用,reject拒绝态调用 -> 都是函数
    4.executor在创建Promise时立即调用，是跟着主线程同步执行的
    5.每个promise实例对象都会有一个then方法，resolve出来的结果由then接收，then有两个函数参数，resolve结果由参数一接收，reject由二接收
    6.then是异步调用
    7.promise的三个状态 pending等待 fulfilled成功，也叫resolved，rejected失败
        三种状态之间是不可逆的
        只能由等待转换成功或者失败，不能从成功或失败转成等待
            pending -> resolve √    resolve -> pending ×
            pending -> reject √     reject -> pending ×
        也不能从成功转到失败，或者是失败转到成功
            resolve -> reject ×
            reject -> resolve ×
    8.每个then还能继续返回promise，还能继续then
        promise.then().then()
    9.reject后的状态由then的第二个错误函数参数或者catch捕获
        promise.then(res=>{},err=>{}).catch(err=>{})
    10.then的错误处理参数，和catch是只能存在一个，比如then的错误捕获处理之后，就不走catch
        promise.then(res=>{
        },err=>{
            console.log('then err',err)
        }).catch(err=>{
            console.log('catch err',err)
        })
        结果是 'then err'
        结论就是，如果错误有人捕获处理，后面的处理就不会执行，如果没有处理，那么err就会一直穿透传递，直到有处理方法为止，executor中抛出错误也是一样的机制
     */
    const promise = new Promise((resolve,reject)=>{
        console.log('我是立即调用的')
        // resolve('结果')
        // throw new Error()
    })

    promise.then(res=>{
        console.log(res)
    },err=>{
        console.log('then err',err)
    }).catch(err=>{
        console.log('catch err')
    })
}

