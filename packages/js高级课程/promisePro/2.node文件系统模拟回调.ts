import * as path from 'path'
import {readFile,writeFileSync} from 'fs'

export default function (){
    // 利用node文件模块模拟回调请求
    let uid = 1
    // 常规写法
    readFile(path.resolve(__dirname,'../data/user.json'),'utf-8',function (err, data){
        const userData = JSON.parse(data),
            userInfo = userData.filter(item=>item.id === uid)[0]

        readFile(path.resolve(__dirname,'../data/userCourse.json'),'utf-8',function (err, data){
            const userCourseData = JSON.parse(data),
                userId = userInfo.id,
                userCourse = userCourseData.filter(item=>item.uid === userId)[0]

            readFile(path.resolve(__dirname,'../data/course.json'),'utf-8',function (err, data){
                const courseData = JSON.parse(data),
                    userCourses = userCourse.course;

                let arr = []
                userCourses.map(id=>{
                    courseData.map(item=>{
                        if (id === item.id){
                            arr.push(item)
                        }
                    })
                })

                const userCourseInfo = {
                    username:userInfo.username,
                    courses:arr
                }

                writeFileSync(`${path.resolve(__dirname,`../data/${userInfo.username}.json`)}`,JSON.stringify(userCourseInfo))
            })
        })
    })
}