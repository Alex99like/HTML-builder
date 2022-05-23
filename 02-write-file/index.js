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
        if (name == 'exit') {
            readline.close()
            process.exit()
        }
    fs.appendFile(path.resolve(__dirname, 'text.txt'), name + '\n', () => enterText())
    })
}

