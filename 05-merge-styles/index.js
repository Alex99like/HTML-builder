const fs = require('fs')
const path = require('path')



const bundle = async () => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}




const readStyles = async (arrItem) => {
    fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), '', () => {})
    return new Promise((resolve, reject) => {
        for (let item of arrItem) {
            fs.readFile(path.resolve(__dirname, 'styles', `${item}`), 'utf-8', (err, data) => {
                appendFs(data)
            })
        }
    })  
}

function appendFs(data) {
    fs.appendFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), data, () => {})
}

const filterStyles = async (pathSt) => {
    return new Promise((resolve, reject) => {
        fs.readdir(pathSt, (err, data) => {
            resolve(data.filter(item => path.extname(path.join(pathSt, `${item}`)) === '.css'))
        })  
    })  
}


bundle()
.then(() => filterStyles(path.resolve(__dirname, 'styles')))
.then((res) => readStyles(res))


