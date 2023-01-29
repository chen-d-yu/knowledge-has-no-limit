import  {readFile} from './utils'
export default async function (){
            /*
        async await是Promise执行后的对象产出结果的语法糖
            是等待Promise状态的一种手段，
            async await能干Promise的活，但是无法处理结果
        then回调函数多得话，其实也会形成回调地狱，
        等待Promise处理后的结果
        resolve 接收结果
        reject 会抛出异常

        async是当前这个函数与同一个作用域下的函数是异步的关系
         */
    const res = await  readFile('../data/user.json')

    console.log(res)
}
