import path from 'path';
import fs from 'fs';

const filePath =['../data/user.json', '../data/userCourse.json', '../data/course.json']
const readFile = (filePath, isError?:any) =>{
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, filePath), 'utf-8', (err, data) => {
            if (err || isError) {
                reject('读取失败')
            }
            resolve(JSON.parse(data))
        })
    })
}


export {
    filePath,
    readFile
}
