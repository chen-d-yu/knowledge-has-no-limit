import * as path from 'path'
import * as fs from "fs";

let uid = 1

export default async function   ()  {
    const readFile = (filepath) => {
        return new Promise((resolved, reject) => {
            fs.readFile(path.resolve(__dirname, filepath), 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                }

                const res = JSON.parse(data)
                resolved({
                    data: res
                })
            })
        })
    }
    const arr = []
    const userRes = await readFile('../data/user.json')
    const {data: user} = userRes as any
    // 用户信息
    const {id: userId, username: userName} = user.filter(item => item.id === uid)[0]

    const userCourseRes = await readFile('../data/userCourse.json')
    const {data: userCourseData} = userCourseRes as any
    // 课程id列表
    const userCoursesIds = userCourseData.filter(item => item.uid === userId)[0].course

    const courseRes = await readFile('../data/course.json')
    const {data: courseData} = courseRes as any

    userCoursesIds.map(id => {
        courseData.map(item => {
            if (id === item.id) {
                arr.push(item)
            }
        })
    })

    fs.writeFileSync(`${path.resolve(__dirname, `../data/${userName}.json`)}`, JSON.stringify({
        userName,
        course: arr
    }))
}
