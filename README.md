# Webpack change detection

Detect and act on relevant source code changes within a webpack plugin.

Custom plugin `HtmlPlugin` emits the HTML source once when webpack starts, then (when running `webpack-dev-server`) whenever the source changes.

This technique is handy for plugins with more involved transformation pipelines. It also enables plugins to be more efficient, only working when they need to.

```bash
# once
npm install

# serve and watch for changes
npm start

# build once
npm run build
```