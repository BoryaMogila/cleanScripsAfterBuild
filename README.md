# cleanScripsAfterBuild

# install
```
npm install --save clean-scripts-after-build

```
# Usage Example

```
node ./node_modules/clean-scripts-after-build --path [string] --bundleName [string]

// need npm install webpack-shell-plugin
var WebpackShellPlugin = require('webpack-shell-plugin');

//put it on plugins array for webpack
new WebpackShellPlugin({
        onBuildStart:['echo "Webpack Start"'],
        onBuildEnd:[
            `node ./node_modules/clean-scripts-after-build --path ${__dirname + '/public/js/'} --bundleName bundle.js`
        ]
})

//or

node ./node_modules/clean-scripts-after-build --path ./public/js/ --bundleName bundle.js

```