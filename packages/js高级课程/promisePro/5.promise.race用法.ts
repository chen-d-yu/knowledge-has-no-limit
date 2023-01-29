import {readFile,filePath} from './utils'
export default function (){
    /*
     race竞争promise，在这个可迭代参数中，无论是谁先完成，成功或者失败，都只会返回第一个结果，剩下的就不会继续了
     */

    /*
     1.Promise.race()接收一个可迭代对象数组(array,map,set)
     2.无论是成功或者失败，只会返回第一个成功的结果，剩下的就不管了
     3.如果返回的promise的内部是空，那么这个promise的状态永远都会是等待态pending
     使用场景：测试资源或者接口的响应速度
     */
    const fetchList = filePath.map(path => {
        return readFile(path)
    })
    // Promise.race(fetchList).then(res=>{
    //     console.log(res)
    // })

}