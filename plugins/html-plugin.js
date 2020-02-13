const fs = require('fs');
const path = require('path');
const name = 'Html Plugin';

class HtmlPlugin {

    constructor() {
        this.lastTimestamps = new Map();
        this.indexHtmlPath = path.resolve(__dirname, '../src', 'index.html');
        // just one member for this experiment
        this.lastTimestamps.set(this.indexHtmlPath, Date.now());
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync(name, (compilation, callback) => {

            const timestamps = compilation.fileTimestamps;
            const dependencies = compilation.fileDependencies;

            // add the source to the watch graph
            dependencies.add(this.indexHtmlPath);

            if (timestamps.has(this.indexHtmlPath)) {
                const lastTime = this.lastTimestamps.get(this.indexHtmlPath);
                const newTime = timestamps.get(this.indexHtmlPath);
                this.lastTimestamps.set(this.indexHtmlPath, newTime);
                if(lastTime < newTime) {
                    // The HTML source changed, emit it
                    this.writeHtml(compilation);
                } else {
                    // No HTML changes, do nothing
                }
            } else {
                // No HTML dependency on first pass, emit file
                this.writeHtml(compilation);
            }
            callback();
        })
    }

    writeHtml(compilation) {
        const source = fs.readFileSync(this.indexHtmlPath, 'utf8');
        const asset = { source: () => source, size: () => source.length};
        compilation.assets['index.html'] = asset;
    }
}

module.exports = HtmlPlugin;