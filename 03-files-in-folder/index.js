const fs = require('fs')
const path = require('path')

fs.readdir(path.resolve(__dirname, 'secret-folder'), (err, data) => {
    data.forEach(item => {
        fs.stat(path.resolve(__dirname, 'secret-folder', `${item}`), (err, data) => {
            if (data.isFile()) {
                console.log(`${path.parse(item).name} - ${path.parse(item).ext.slice(1)} - ${(data.size/1024).toFixed(3)}kb`)
            }
        })
    })
})




