import { readFile, writeFile } from 'fs/promises';
import SimpleDOM from 'simple-dom/dist/commonjs/es5/index.js';

import Module from "node:module";

const require = Module.createRequire(import.meta.url);

global.FastBoot = {
  require(thing) {
    require(thing)
  }
}

import Result from './result.mjs';

const { default: App } = await import('./dist-ssr/app.mjs');
const wrapperHTML = await readFile('./dist/index.html', 'utf8');

const result = await render('/', App);

result._finalizeHTML();
await writeFile('dist/index.html', await result.html());


function buildBootOptions() {
  let doc = new SimpleDOM.Document();
  let rootElement = doc.body;
  return {
    isBrowser: false,
    document: doc,
    rootElement,
    shouldRender: true,
  };
}

async function render(url, App) {
  let instance = App.create({
    autoboot: false,
    modulePrefix: 'ssg-tests',
  });
  let bootOptions = buildBootOptions();
  await instance.visit(url, bootOptions);
  return new Result(bootOptions.document, wrapperHTML, {})
}


//  for (const url of routesToPrerender) {
//     const [appHtml, preloadLinks] = await render(url, manifest)

//     const html = template
//       .replace(`<!--preload-links-->`, preloadLinks)
//       .replace(`<!--app-html-->`, appHtml)

//     const filePath = `dist/static${url === '/' ? '/index' : url}.html`
//     fs.writeFileSync(toAbsolute(filePath), html)
//     console.log('pre-rendered:', filePath)
//   }
