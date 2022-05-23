const fs = require('fs')
const path = require('path')
const readline = require('readline').createInterface({
    input: process.stdin, output: process.stdout
})

process.on('exit', () => console.log(`\nGoodLuck!!!`));
console.log("Hello enter your text)")


fs.writeFile(path.resolve(__dirname, 'text.txt'), '', () => enterText())

function enterText () {
    readline.question('Enter text: ', (name) => {
    fs.appendFile(path.resolve(__dirname, 'text.txt'), name + '\n', () => {
        if (name != 'exit') return enterText()
        readline.close()
        process.exit()
        })
    })
}

