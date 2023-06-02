const {globSync} = require('glob')
const path = require('node:path')
const esbuild = require('esbuild')

const IN_PATH = path.resolve('src', 'includer')
const OUT_PATH = 'includer'

const tsFiles = globSync(`${IN_PATH}/**/*.ts`)

const builds = Promise.all(tsFiles.map((name) => {
    const newFilePath = path.resolve(OUT_PATH, name.substring(IN_PATH.length + 1))
    const jsFile = newFilePath.replace('.ts', '.js')

    return esbuild.build({
            format: 'cjs',
            target: 'es2016',
            entryPoints: [name],
            outfile: jsFile,
            packages: 'external'
    })
}))

builds.then((result) => console.log(`Compiled ${result.length} files`))