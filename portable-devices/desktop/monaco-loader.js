var requireEsm = require('esm')(module, { cjs: true });
module.exports = function(content, map, meta) {
    console.log('--orginal content', content);

    if (/@vscode[\\\/]monaco-editor[\\\/]esm[\\\/].+\.js$/.test(this.resourcePath)) {
        console.log('--THIS.RESOURCE PATH', this.resourcePath);
        // const vsPath = this.resourcePath.split(/monaco-editor[\\\/]esm[\\\/]/).pop();
        // if (vsPath) {
        //     // localize\.apply\(\s*([^,]+)\s*,\s*\
        //     const path = vsPath.replace(/\\/g, '/').replace('.js', '');
        //     return content.replace(/localize\(/g, `localize('${path}', `);
        // }
        // const content = requireEsm(this.resourcePath);
        console.log('--content', content);
        return content;
    }
    console.log('-----not ', this.resourcePath)
    return content;
}