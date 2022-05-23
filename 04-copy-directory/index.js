const fs = require('fs')
const path = require('path')


function copyFileFn(pathCopy) {
    fs.readdir(pathCopy, (err, arr) => {
        for (let item of arr) {
            fs.stat(path.join(pathCopy, `${item}`), (err ,data) => {
                if (data.isFile()) {
                    createFile(item)
                } else if (data.isDirectory()) {
                    createFolder(path.resolve(__dirname, 'copy-file'), `${item}`)
                }
            })
        }
    })
}

function createFile (dataFile) {
    let pathOne = path.resolve(__dirname, 'files', dataFile)
    let pathTwo = path.resolve(__dirname, 'copy-file', dataFile)
    fs.copyFile(pathOne, pathTwo, (err) => {})
}

function createFolder(pathDir, name) {
    fs.mkdir(path.join(pathDir, name), () => {})
}

function createDir (pathFs, name) {
    fs.mkdir(pathFs, (err) => {
        copyFileFn(path.resolve(__dirname, name = 'files'))
    })
}

function deleteDir (pathFs) {
    fs.rm(pathFs, {recursive: true}, (err) => createDir(pathFs))
}

function copyDir () {
    deleteDir(path.join(__dirname, 'copy-file'))
} 





copyDir()


