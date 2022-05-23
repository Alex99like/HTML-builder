const fs = require('fs')
const path = require('path')


async function readComponents(component, ext) {
    let pathFs = path.resolve(__dirname, component)
    return new Promise((resolve, rej) => {
        fs.readdir(pathFs, 'utf8', (err, data) => {
            resolve(data.filter(item => path.parse(path.join(pathFs, item)).ext == ext))
        }) 
     })
}


async function readTemplate() {
    let pathFs = path.resolve(__dirname, 'template.html')
    return new Promise((resolve, rej) => {
        fs.readFile(pathFs, 'utf8', (err, data) => resolve(data)) 
     })
}


async function readFileFs(item, component) {
    let pathFs = path.resolve(__dirname, component, item)
    return new Promise((resolve, rej) => {
        fs.readFile(pathFs, 'utf8', (err, data) => resolve(data)) 
     })
}



async function createCSS() {
    let arrCss = await readComponents('styles', '.css')
    let style = ''
    for (let item of arrCss) {
        let el = await readFileFs(item, 'styles')
        style += el
    }

    fs.writeFile(path.resolve(__dirname,'project-dist', 'style.css'), style, () => {})
}


async function createHTML() {
    
    let arrItem = await readComponents('components', '.html')
    let template = await readTemplate()
    
    for (let item of arrItem) {
        let teg = `{{${path.parse(path.resolve(__dirname, 'components', `${item}`)).name}}}`
        let el = await readFileFs(item , 'components')
        
        template = template.replace(teg, el)
    }
    
    fs.writeFile(path.resolve(__dirname,'project-dist', 'index.html'), template, () => {})
}

///////////////////////////////////////////////////////////////////////

async function createAssets(pathRm, dir) {
    fs.rm(path.join(pathRm, dir), {recursive: true}, () => {
        fs.mkdir(path.join(pathRm, dir), () => {
            copyAssets()
        })
    })
}

async function readDir(component) {
    let pathFs = path.resolve(__dirname, component)
    return new Promise((resolve, rej) => {
        fs.readdir(pathFs, 'utf-8', (err, data) => resolve(data))
     })
}

async function createDir(component, dir, item) {
    let pathFs = path.join(__dirname, component, dir, item)
    return new Promise((resolve, rej) => {
        fs.mkdir(pathFs, () => {
            copyFileFs(path.join('assets', item))
            
        })
    })
}

async function copyFileFs(component) {
    
    let arrEl = await readDir(component)
    for (let item of arrEl) {
        let pathOne = path.resolve(__dirname, component, item)
        let pathTwo = path.join(__dirname, 'project-dist', component, item)

        fs.copyFile(pathOne, pathTwo, (err) => {})
    }
}



async function copyAssets() {
    let arrDir = await readDir('assets') 
    
    try {
        for (let item of arrDir) {
            let pathDir = path.resolve(__dirname, 'assets', `${item}`)
            fs.stat(pathDir, (err, data) => {
                   if (data.isDirectory()) {
                    createDir('project-dist', 'assets', `${item}`)
                } else if (data.isFile()) {
                    fs.copyFile(pathDir, path.resolve(__dirname, 'project-dist', 'assets', `${item}`), () => {})
                } 
            })
        }
    } catch (e) {console.log('No folder Assets')}
     
}
 


fs.mkdir(path.resolve(__dirname, 'project-dist'), () => {
    createHTML()
    createCSS()
    createAssets(path.resolve(__dirname, 'project-dist'), 'assets')
})