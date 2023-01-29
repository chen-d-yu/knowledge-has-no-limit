import {readFile,filePath} from './utils'
export default function () {
    /*
    合并多个请求，并且按照顺序排列
    只有当可迭代的异步请求成功了，才能从res中读取到数据
    如果其中有一个失败，那么全部都会失败
     */


    const fetchList = filePath.map(path => {
        return readFile(path)
    })
    /*
    1.Promise.all()接收一个可迭代对象数组(array,map,set)
    2.数组可以是promise集合，也可以不是
        如果不是promise集合，那么传递的就是本身的值
    3.有一个promise是失败的状态，那么实例会返回reject回调
        如果多个错误状态，则会返回第一个失败的原因
    返回的是一个所有可迭代对象的请求结果的promise集合[res,res1,res2]
    作用：多个异步任务并发运行，等待所有任务完成或者失败
     */
    // Promise.all([...fetchList,"a",{name:"张三"}]).then(res=>{
    //     console.log(res)
    // })
    // Promise.all(fetchList).then(res=>{
    //     console.log(res)
    // })
    // Promise.all([new Promise((resolve, reject)=>{
    //     reject('失败')
    // }),readFile('../data/user.json',true)]).then(res=>{
    //     console.log(res)
    // }).catch(error=>{
    //     console.log(error)
    // })
}